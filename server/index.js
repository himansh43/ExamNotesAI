import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { connectDb } from "./utils/db.js";
import cors from "cors";
// import { GoogleGenAI } from "@google/genai";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { verifyToken } from "./middlewares/protectedRoutes.js";
import geminiRouter from "./routes/geminiRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import { stripeWebHook } from "./controllers/paymentController.js";
import pdfRouter from "./routes/pdfRoutes.js";

const app = express();

app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  stripeWebHook
 
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
app.use("/api/auth", authRouter);
app.use("/api/user", verifyToken, userRouter);
app.use("/api/gemini-result", verifyToken, geminiRouter);
app.use("/api/payment", verifyToken, paymentRouter);
app.use("/api/pdf",verifyToken,pdfRouter)


app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
  connectDb();
});
