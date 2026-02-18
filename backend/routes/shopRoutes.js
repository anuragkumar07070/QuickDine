import express from "express";

import {
  addProduct,
  updateProduct,
  deleteProduct,
  getShopMenu,
  toggleAvailability,
} from "../controllers/shopController.js";

import {
  protect,
  isShopAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* Shop Admin Routes */
router.post("/", protect, isShopAdmin, addProduct);

router.put("/:id", protect, isShopAdmin, updateProduct);

router.delete("/:id", protect, isShopAdmin, deleteProduct);

router.patch(
  "/:id/toggle",
  protect,
  isShopAdmin,
  toggleAvailability
);

/* Public Menu */
router.get("/menu/:shopId", getShopMenu);

export default router;
