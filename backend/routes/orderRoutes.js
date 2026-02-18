import express from "express";
import { createQrOrder } from "../controllers/orderController.js";

const router = express.Router();

/* Public QR Order */
router.post("/qr", createQrOrder);

export default router;
