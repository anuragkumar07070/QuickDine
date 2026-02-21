import express from "express";
import { createShop, addShopAdmin, createMasterAdmin , getAllShops, toggleShopStatus, deleteShop } from "../controllers/masterController.js";
import { protect, isMasterAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* Create Shop */
router.post("/create-shop",protect,isMasterAdmin,createShop);

/* Add Extra Shop Admin */
router.post("/add-shop-admin",protect,isMasterAdmin,addShopAdmin);

/* Create New Master Admin */
router.post("/create-admin",protect,isMasterAdmin,createMasterAdmin);

// Display All shops in Master Admin
router.get("/shops",protect,isMasterAdmin,getAllShops);

// Block / Unblock Shop
router.patch("/shop/:id/status",protect,isMasterAdmin,toggleShopStatus);

// Delete Shop 
router.delete("/shop/:id",protect,isMasterAdmin,deleteShop);


export default router;
