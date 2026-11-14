import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    fireBaseId:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    avatar:{
        type:String
    },
    credits:{
        type:String,
        default:100,
        min:0
    },
    isCreditAvailable:{
        type:Boolean,
        default:true
    },
    notes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"notes",
        default:[]
    }
    
},{timestamps:true})

const userModel= mongoose.model("user", userSchema)
export default userModel