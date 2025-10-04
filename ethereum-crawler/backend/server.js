import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import transactionRoutes from "./routes/transactions.js";
import balanceRoutes from "./routes/balance.js";
import tokenRoutes from "./routes/tokens.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/transactions", transactionRoutes);
app.use("/balance", balanceRoutes);
app.use("/tokens", tokenRoutes);

// Health
app.get("/", (req, res) => res.json({ ok: true, message: "Ethereum Crawler Backend" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
