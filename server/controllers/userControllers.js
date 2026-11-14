import userModel from "../models/user.model.js"


const getUser=async(req,res)=>{
    try {
        const userId= req.userId
        const user=await userModel.findById(userId)

        return res.json({success:true,message:"successfully get user",user})
    } catch (error) {
        console.log("get user error", error)
        return res.json({message:"Internal server error", success:false})
    }
}

export {getUser}