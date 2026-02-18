import Order from "../models/Order.js";
import Product from "../models/Product.js";

/* ================================
   Create QR Order
================================ */
export const createQrOrder = async (req, res) => {
  try {
    const { shopId, tableNo, customerPhone, items } = req.body;

    if (!shopId || !customerPhone || !items || items.length === 0) {
      return res.status(400).json({
        msg: "Invalid order data",
      });
    }

    let orderItems = [];
    let totalAmount = 0;

    // Validate each product
    for (const item of items) {
      const product = await Product.findOne({
        _id: item.productId,
        shopId,
        isAvailable: true,
      });

      if (!product) {
        return res.status(404).json({
          msg: "Product not found or unavailable",
        });
      }

      const orderItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        isVeg: product.isVeg,
      };

      totalAmount += product.price * item.quantity;

      orderItems.push(orderItem);
    }

    const order = await Order.create({
      shopId,
      items: orderItems,
      totalAmount,
      tableNo,
      customerPhone,
      orderSource: "qr",
      paymentStatus: "pending",
      status: "pending",
    });

    res.status(201).json({
      msg: "Order Created Successfully",
      orderId: order._id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
    });

  } catch (error) {
    console.error("Create QR Order Error:", error);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
