import jwt from 'jsonwebtoken'

export const verifyToken=async(req,res,next)=>{
    const token= req.cookies?.examNotesToken
 
    if(!token){
        return res.status(400).json({message:"Unauthorized", success:false,})
    }
    const decodedValue= jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!decodedValue){
         return res.status(400).json({message:"Unauthorized", success:false,})
    }
   
    req.userId=decodedValue.id
    next()
}