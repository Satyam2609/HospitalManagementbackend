import { patientrecordservices } from "../services/HospitalSalary.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {getAllDepartment, getallpateintrecord} from "../repository/HospitalSalaryDasbord.js"
import { checkFreestaff } from "../repository/Hospital.repository.js";
export const pateintcontroller = asyncHandler(async(req , res) => {
    const data = req.query
    console.log("dkwnfjf",data)
    const patient = await patientrecordservices(data)
    console.log("jnefj",patient)
    if(!patient){
        return res.status(404).json({
            success:false,
            message:"not found"
        })
    }

    return res.status(201).json({
        success:true,
        message:"successfully retirve",
        patient
    })
})

export const getDepartments = asyncHandler(async(req , res) => {
   const depart = req.query.depart
    console.log("fknfj",depart)
let departdata
let staff
    if(depart){departdata = await getAllDepartment() ,
          staff = await checkFreestaff(depart) }
    departdata = await getAllDepartment()
    console.log(departdata)
    if(!departdata){
        return res.status(404).json({
            success:false,
            message:"get depart"
        })
    }

    return res.status(200).json({
        success:true,
        message:"successfully departments",
        data:depart ? {departments:departdata , staffdata:staff} : departdata


    })
})

export const getAllpatientsRecord = asyncHandler(async(req , res) => {
    const {numberdays} = req.params
    console.log("sfmkf",numberdays)
    const totalrecord = await getallpateintrecord(numberdays)
    console.log("rrrr",totalrecord)
    if(!totalrecord){
        return res.status(404).json({
            success:false,
            message:"get depart"
        })
    }

    return res.status(201).json({
        success:true,
        message:"get all record",
        totalrecord
    })
})