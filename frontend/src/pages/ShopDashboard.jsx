import { useEffect, useState } from "react";
import API from "../api/api";
import ShopLayout from "../components/ShopLayout";
import { useNavigate } from "react-router-dom";

function ShopDashboard() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await API.get("/order/shop", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await API.patch(
      `/order/${id}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchOrders();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (order.tableNo &&
        order.tableNo
          .toLowerCase()
          .includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <ShopLayout>
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Orders Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search order..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="served">Served</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders List */}
      {filteredOrders.map((order) => (
        <div
          key={order._id}
          className="bg-white p-4 rounded-xl shadow mb-4"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">
                {order.orderNumber}
              </p>
              <p className="text-sm text-gray-500">
                Table: {order.tableNo}
              </p>
              <p className="text-sm">
                Total: ₹ {order.totalAmount}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    order.status === "served"
                      ? "text-green-600"
                      : order.status === "preparing"
                      ? "text-yellow-600"
                      : order.status === "cancelled"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  updateStatus(order._id, "preparing")
                }
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Preparing
              </button>

              <button
                onClick={() =>
                  updateStatus(order._id, "served")
                }
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Served
              </button>

              <button
                onClick={() =>
                  updateStatus(order._id, "cancelled")
                }
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}

      {filteredOrders.length === 0 && (
        <p className="text-gray-500">
          No orders found.
        </p>
      )}
    </ShopLayout>
  );
}

export default ShopDashboard;