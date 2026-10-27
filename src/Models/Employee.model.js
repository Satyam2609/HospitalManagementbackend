import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const doctorSchema = new mongoose.Schema({
    specialization:{
        type:String,
        required:true,
        default:null
    },
    experience:{
        type:String,    
        required:true,
        default:null
    },
    
education: [{
  degree: { type: String, required: true, default: null },
  institution: { type: String, required: true, default: null },
  year: { type: Number, required: true, default: null }
}]

})

const EmployeeSchema = new mongoose.Schema({
    employeId:{
        type:String,
        required:true
    },
     profilePhoto:{
        type:String,
        required:true
     },

    department:{
        type:String,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
 type:String,
  required:true
    },
    phone:{
        type:String,
        required:true,
        minlength:10
    },
    password:{
        type:String,
        required:true
    },
    hospitalName:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }, 
    currentWork:[{
        title:{type:String, required:true},
        status:{enum:["completed","pending","inprogress"] , type:String , required:true , default:"pending"},
        Activity:{type:String , required:true , enum:["free","busy"] , default:"free"},
    }],
    CommonWork: [
    {
        title: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["completed", "pending"],
            default: "pending"
        }
    }
],

 workertype: {
  type: String,
  enum: ["doctor", "worker"],
  default: "worker",
},
workerposition: {
  type: String,
  enum: ["head", "worker"],
  default:"worker",
  required: true
},
doctor:{
    type: doctorSchema,
    required: function() {
        return this.workertype === "doctor";
    }
}

})

EmployeeSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return 
    this.password = await bcrypt.hash(this.password , 10)
    
})
EmployeeSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}
EmployeeSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email,
        role:"employee"
    },
    process.env.JWT_ACCESS_TOKEN,
    {expiresIn:"2h"}
    )
}

EmployeeSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id:this._id
    },
    process.env.JWT_Refresh_TOKEN,
    {expiresIn:"7d"}
    )
}
export const employee = mongoose.model("employee" , EmployeeSchema)