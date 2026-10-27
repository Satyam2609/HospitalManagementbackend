import { User } from "../Models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AuthUser, LoginUser } from "../services/Auth.service.js";


export const generateaccesstokenrefreshtoken = async(userId, AccountModel = User) => {
   try {
    const user = await AccountModel.findById(userId)
     console.log("user" , user)
     if(!user){
         return res.status(401).json({
             success:false,
             message:"user not found"
         })
     }
     const accesstoken = await user.generateAccessToken()
     const refreshtoken = await user.generateRefreshToken()
    user.refreshtoken = refreshtoken
     await user.save({validateBeforeSave:false})
     return {accesstoken , refreshtoken}
   } catch (error) {
    throw new Error("token not generated")
   }

}

export const register = asyncHandler(async(req , res) => {
    const data = req.body

    const file = req.file.path
    if(!file){
        return res.status(404).json({
            success:false,
            message:"file not uploaded"
        })
    }

    const uploaddata = await AuthUser(data , file)
    if(!uploaddata){
        return res.status(404).json({
            success:false,
            message:"user create failed"
        })
    }
    return res.status(200).json({
        success:true,
        message:"User created successfully"
    })
})


export const loginUser = asyncHandler(async(req , res) => {
    const data = req.body
    console.log(data)

const {user , accesstoken , refreshtoken} = await LoginUser(data)

const option = {
    httpOnly:true,
    secure:true,
    samSite:"strict"
}

res.status(200)
.cookie("accesstoken" , accesstoken , option)
.cookie("refreshtoken" , refreshtoken , option)
.json({
    success:true,
    message:"Login successfully",
    user
})
})

