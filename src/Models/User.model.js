import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        },
    email:{
        type:String,
         required:true,
    },
    password:{
        type:String,
        minlength:6,
        required:true
     },
     role:{
        type:String,
        enum:["patient" , "admin" , "hospital"],
        required:true
     },
     avatar:{
        type:String,
     }
    
})

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});
UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}
UserSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
        role:this.role
    },
    process.env.JWT_ACCESS_TOKEN,
    {expiresIn:"2h"}
)
}

UserSchema.methods.generateRefreshToken = function() {
   return  jwt.sign({
        _id:this._id,
        
    },
    process.env.JWT_Refresh_TOKEN,
    {expiresIn:"7d"}
)
}

export const User = mongoose.model("User" , UserSchema)
