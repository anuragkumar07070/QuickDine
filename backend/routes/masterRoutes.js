import express from "express";
import { createShop, addShopAdmin, createMasterAdmin } from "../controllers/masterController.js";
import { protect, isMasterAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* Create Shop */
router.post("/create-shop",protect,isMasterAdmin,createShop);

/* Add Extra Shop Admin */
router.post("/add-shop-admin",protect,isMasterAdmin,addShopAdmin);

/* Create New Master Admin */
router.post("/create-admin",protect,isMasterAdmin,createMasterAdmin);


export default router;
