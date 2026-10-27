import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    patientname:{type:String , required:true},
    department:{type:String , required:true},
    location:{type:String , required:true},
    problem:{type:String , required:true},
    gurdian:{type:String , required:true},
    gurdiancounts:{type:String , required:true},
    applicationStatus:{type:String , enum:["Accept" , "rejected" , "panding" , "Complete"] , default:"panding"},
    doctor:{type:String , required:true}
    
} , {
    timestamps:true
})

export const patientdetails = mongoose.model("patients" , PatientSchema)