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

/* ================================
   Create Manual Order (Shop Admin)
================================ */
export const createManualOrder = async (req, res) => {
    try {
        const { tableNo, customerPhone, items, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                msg: "Items are required",
            });
        }

        let orderItems = [];
        let totalAmount = 0;

        // Validate products belonging to this shop
        for (const item of items) {
            const product = await Product.findOne({
                _id: item.productId,
                shopId: req.user.shopId,
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
            shopId: req.user.shopId,
            items: orderItems,
            totalAmount,
            tableNo,
            customerPhone,
            orderSource: "manual",
            createdBy: req.user._id,
            paymentStatus: paymentMethod === "cash" ? "paid" : "pending",
            status: "pending",
        });

        res.status(201).json({
            msg: "Manual Order Created ✅",
            orderId: order._id,
            orderNumber: order.orderNumber,
            totalAmount: order.totalAmount,
        });

    } catch (error) {
        console.error("Manual Order Error:", error);
        res.status(500).json({
            msg: "Server Error",
        });
    }
};

/* ================================
   Get Orders for Shop
================================ */
export const getShopOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            shopId: req.user.shopId,
        }).sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error("Get Orders Error:", error);
        res.status(500).json({ msg: "Server Error" });
    }
};

/* ================================
   Update Order Status
================================ */
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findOne({
            _id: req.params.id,
            shopId: req.user.shopId,
        });

        if (!order) {
            return res.status(404).json({
                msg: "Order not found",
            });
        }

        order.status = status;
        await order.save();

        res.json({
            msg: "Order Updated ✅",
            order,
        });

    } catch (error) {
        console.error("Update Status Error:", error);
        res.status(500).json({ msg: "Server Error" });
    }
};