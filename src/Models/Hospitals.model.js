import mongoose from "mongoose";




const patientHosSchema = new mongoose.Schema({
    HospitalPaRoom:[{
      Hospitalroomno:{type:String , required:true},
        Patient:{type:Number , required:true},
        department:{type:String , required:true},
        Bads:{type:Number, required:true}

    }],
    Hospitalstaff:{type:String , required:true},
    staffId:{type:String , required:true},
    medicalEquipments: [
  {
    name: String,
    category: String,
    quantity: Number,
    price:String,
    availableQuantity: Number,
    status: String,
  }
],
underWorkingStaff: [
  {
    staffId: {
      type: String,
      ref: "Employee"
    },
    staffName: String
  }
]
})

export const HospitalRoom = mongoose.model("HospitalRoom" , patientHosSchema)