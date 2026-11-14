import express from "express"
import { stripePayment } from "../controllers/paymentController.js"

const paymentRouter= express.Router()

paymentRouter.post("/create-checkout-session",stripePayment)

export default paymentRouter