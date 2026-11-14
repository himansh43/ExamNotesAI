import express from "express"
import pdfController from "../controllers/pdfController.js"

const pdfRouter= express.Router()

pdfRouter.post("/downloadPdf",pdfController)

export default pdfRouter