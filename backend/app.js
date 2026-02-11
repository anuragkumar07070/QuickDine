import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import masterRoutes from "./routes/masterRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/master", masterRoutes);

app.get("/", (req, res) => {
  res.send("QR Menu API Running 🚀");
});

export default app;
