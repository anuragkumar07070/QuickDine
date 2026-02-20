import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api.js";

function MenuPage() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [tableNo, setTableNo] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    console.log("Shop ID:", shopId);
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await API.get(`/shop/menu/${shopId}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, type) => {
    setCart(
      cart
        .map((item) => {
          if (item._id === id) {
            const newQty =
              type === "inc"
                ? item.quantity + 1
                : item.quantity - 1;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotal = () => {
    return cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const placeOrder = async () => {
    if (!tableNo || !customerPhone || cart.length === 0) {
      alert("Fill all fields and add items");
      return;
    }

    try {
      const orderData = {
        shopId,
        tableNo,
        customerPhone,
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      };

      const res = await API.post("/order/qr", orderData);

      navigate("/order-success", {
        state: {
          orderNumber: res.data.orderNumber,
          total: res.data.totalAmount,
        },
      });

      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-32">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Menu
      </h1>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h2 className="text-lg font-semibold">
              {item.name}
            </h2>
            <p className="text-gray-600">
              ₹ {item.price}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="mt-3 bg-black text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t">
          <h2 className="font-semibold mb-2">Your Cart</h2>

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.name} x {item.quantity}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item._id, "dec")
                  }
                  className="px-2 bg-gray-200 rounded"
                >
                  -
                </button>

                <button
                  onClick={() =>
                    updateQuantity(item._id, "inc")
                  }
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="mt-3">
            <input
              type="text"
              placeholder="Table No"
              className="w-full border p-2 rounded mb-2"
              value={tableNo}
              onChange={(e) =>
                setTableNo(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="WhatsApp Number"
              className="w-full border p-2 rounded mb-2"
              value={customerPhone}
              onChange={(e) =>
                setCustomerPhone(e.target.value)
              }
            />

            <div className="flex justify-between font-bold mb-2">
              <span>Total</span>
              <span>₹ {getTotal()}</span>
            </div>

            <button
              onClick={placeOrder}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuPage;