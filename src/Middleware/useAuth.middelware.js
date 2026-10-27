import { User } from "../Models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { employee } from "../Models/Employee.model.js";
import jwt from "jsonwebtoken"

export const userAuth  = asyncHandler(async(req , res , next) => {
 try {
   const token = req.cookies?.accesstoken
   console.log("djfnfjfn",token)
   if(!token){
    return res.status(404).json({
       success:false,
       message:"unAuthorized"
     })
   }
    const decodetoken = jwt.verify(token , process.env.JWT_ACCESS_TOKEN)
    console.log(decodetoken)
     const user = await User.findById(decodetoken._id) || await employee.findById(decodetoken._id)
     if(!user){
       return res.status(401).json({
         success:false,
         message:"user not found"
       })
     }

     return res.status(201).json({
      success:true,
      message:"found",
      user
     })
 } catch (error) {
  console.log("invalid")
  
 }
})