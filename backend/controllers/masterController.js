import Shop from "../models/Shop.js";
import ShopAdmin from "../models/ShopAdmin.js";

/* ================================
   Create Shop + Shop Admin
================================ */
export const createShop = async (req, res) => {
    try {
        const {
            shopName,
            ownerName,
            email,
            phone,
            password,
            address,
        } = req.body;

        // Validate
        if (
            !shopName ||
            !ownerName ||
            !email ||
            !phone ||
            !password
        ) {
            return res.status(400).json({
                msg: "All required fields must be filled",
            });
        }

        // Check if email exists
        const adminExists = await ShopAdmin.findOne({ email });

        if (adminExists) {
            return res
                .status(400)
                .json({ msg: "Email already registered" });
        }

        /* Create Shop */
        const shop = await Shop.create({
            name: shopName,
            ownerName,
            phone,
            email,
            address,
            createdBy: req.user._id,
        });

        /* Generate QR URL */
        const qrUrl = `${process.env.FRONTEND_URL}/shop/${shop._id}`;

        shop.qrUrl = qrUrl;
        await shop.save();

        /* Create Shop Admin */
        const shopAdmin = await ShopAdmin.create({
            name: ownerName,
            email,
            phone,
            password, // auto hashed
            shopId: shop._id,
        });

        res.status(201).json({
            msg: "Shop Created Successfully ✅",

            shop: {
                id: shop._id,
                name: shop.name,
                qrUrl: shop.qrUrl,
                status: shop.status,
            },

            admin: {
                name: shopAdmin.name,
                email: shopAdmin.email,
            },
        });

    } catch (error) {
        console.error("Create Shop Error:", error);
        res.status(500).json({ msg: "Server Error" });
    }
};

/* ================================
   Add Extra Shop Admin
================================ */
export const addShopAdmin = async (req, res) => {
    try {
        const {
            shopId,
            name,
            email,
            phone,
            password,
        } = req.body;

        // Validate
        if (!shopId || !name || !email || !phone || !password) {
            return res.status(400).json({
                msg: "All required fields are mandatory",
            });
        }

        // Check if email exists
        const exists = await ShopAdmin.findOne({ email });

        if (exists) {
            return res.status(400).json({
                msg: "Admin already exists with this email",
            });
        }

        // Create New Shop Admin
        const shopAdmin = await ShopAdmin.create({
            name,
            email,
            phone,
            password, // auto hashed
            shopId,
        });

        res.status(201).json({
            msg: "New Shop Admin Created ✅",
            admin: {
                id: shopAdmin._id,
                name: shopAdmin.name,
                email: shopAdmin.email,
                phone: shopAdmin.phone,
            },
        });

    } catch (error) {
        console.error("Add Shop Admin Error:", error);
        res.status(500).json({ msg: "Server Error" });
    }
};

import Admin from "../models/Admin.js";

/* ================================
   Create New Master Admin
================================ */
export const createMasterAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    // Check if admin already exists
    const exists = await Admin.findOne({ email });

    if (exists) {
      return res.status(400).json({
        msg: "Admin already exists with this email",
      });
    }

    // Create Admin (password auto-hashed)
    const admin = await Admin.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      msg: "New Master Admin Created ✅",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error("Create Master Admin Error:", error);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
