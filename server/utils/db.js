import mongoose from "mongoose"

export const connectDb=async()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("mongoDb connected")
    } catch (error) {
        console.log("mongoDb error",error)
    }
}