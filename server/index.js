
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDb } from "./utils/db.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { verifyToken } from "./middlewares/protectedRoutes.js";
import geminiRouter from "./routes/geminiRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import { stripeWebHook } from "./controllers/paymentController.js";
import pdfRouter from "./routes/pdfRoutes.js";

const app = express();

// CORS configuration
app.use(cors({
    origin: "https://examnotesaiclient-57b1.onrender.com",
    credentials: true,
}));

// Stripe webhook must be before express.json()
app.post(
    "/api/payments/webhook",
    express.raw({ type: "application/json" }),
    stripeWebHook
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
    res.send("ExamNotesAI Server is Running Successfully!");
});

// Public routes
app.use("/api/auth", authRouter);

// Protected routes
app.use("/api/user", verifyToken, userRouter);
app.use("/api/gemini-result", verifyToken, geminiRouter);
app.use("/api/payment", verifyToken, paymentRouter);
app.use("/api/pdf", verifyToken, pdfRouter);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);

    try {
        await connectDb();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
});

