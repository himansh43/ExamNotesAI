import mongoose from "mongoose"
const paymentSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    amount:{
        type:String
    },
    stripeSessionId: {
    type: String,
    required: true,
    unique: true
  },
    planId:{
        type:String
    },
    status:{
        type:Boolean,
        default:"not paid"
    }
},{timestamps})