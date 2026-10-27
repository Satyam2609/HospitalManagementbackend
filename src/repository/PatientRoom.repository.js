import { employee } from "../Models/Employee.model.js";
import { HospitalRoom } from "../Models/Hospitals.model.js";

export const CreatePatient = async(data) => {
    return await HospitalRoom.create({
        Hosptialroomno:data.roomnumber,
        HospitalPaRoom:[{
            Patient:data.Patient,
            PatientType:data.PatientType,
            FreeBad:data.FreeBad
        }],
        Hospitalstaff:[{
            staffalot:data.staffalot,
            staffname:data.staffname,
            staffcount:data.staffcount
        }],
        medicalEquipments:[{
            name:data.name,
    category: data.category,
    quantity:data.quantity,
    availableQuantity:data.availableQuantity,
    status:data.status,
    
        }]
    })
}

export const getRoomDeatils = async (data) => {
  const empdataworker = await employee.aggregate([
    {
      $match:{
        department:data.department,
        workerposition:"worker" || "doctor"
      }
    },
    {
      $project:{
        _id:1,
        name:1
      }
    }
  
  ])

 
  console.log(empdataworker)
  return empdataworker
}