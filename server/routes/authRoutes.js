import express from "express"
import { login,logout } from "../controllers/authControllers.js"

const authRouter= express.Router()

authRouter.post("/login",login)
authRouter.get("/logout",logout)

export default authRouter