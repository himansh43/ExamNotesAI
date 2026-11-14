import express from "express"
import { getAllNotes, getnotesById, googleGenerativeAIResult } from "../controllers/googleGemini.js"


const geminiRouter= express.Router()

geminiRouter.post("/generateGeminiResult",googleGenerativeAIResult,)
geminiRouter.get("/getAllNotes",getAllNotes,)
geminiRouter.get("/getnotesById/:id",getnotesById)

export default geminiRouter
