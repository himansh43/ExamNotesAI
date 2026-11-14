import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const displayName = req.body.displayName;
    const email = req.body.email;
    const imageURL= req.body.photoURL;
    if (!email) {
      return res.status(400).json("UnAuthorized user");
    }
  
    let user = await userModel.findOne({ email });
    if (!user) {
      user= await userModel.create({
        email,
        name: displayName,
        avatar:imageURL
      });
    }
    //Generated Token using JWT.sign
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("examNotesToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path:"/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
   
    return res.status(200).json({success:true,message:"Login successful",user});
  } catch (error) {
    console.log("login error is", error);
    return res
      .status(500)
      .json({ message: `Internal server error ${error}`, success: false });
  }
};


const logout=async(req,res)=>{
  try {
     res.clearCookie("examNotesToken")
    return res.status(200).json({success:true,message:"Logout successful"})
  } catch (error) {
    console.log("logout error is",error)
  }
}

export {login,logout}
