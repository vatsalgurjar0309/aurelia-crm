import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/database.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import authRoutes
from "./routes/authRoutes.js";
import dashboardRoutes
from "./routes/dashboardRoutes.js";
const app = express();

connectDB();
connectDB();

// Middleware FIRST
app.use(cors());

app.use(helmet());

app.use(express.json());

// Rate Limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

// Routes AFTER middleware
app.use("/api/auth", authRoutes);

app.use("/api/inquiries", inquiryRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {

  res.json({

    success: true,

    message:
      "AURELIA API Running"

  });

});



const PORT =
  process.env.PORT || 5001;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});