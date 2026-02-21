import express from "express";
import { createQrOrder, createManualOrder ,getShopOrders ,updateOrderStatus, getShopAnalytics } from "../controllers/orderController.js";

import {protect,isShopAdmin,} from "../middleware/authMiddleware.js";

const router = express.Router();

/* Public QR Order */
router.post("/qr", createQrOrder);

/* Manual Order (Shop Admin Only) */
router.post("/manual", protect, isShopAdmin, createManualOrder);

router.get("/shop", protect, isShopAdmin, getShopOrders);

router.patch("/:id/status",protect,isShopAdmin,updateOrderStatus);

router.get("/analytics",protect,isShopAdmin,getShopAnalytics);
export default router;
