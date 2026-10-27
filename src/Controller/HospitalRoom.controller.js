import { updatehospitaldata } from "../repository/Hospital.repository.js";
import { headservices, HospitalService } from "../services/Hospital.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const controllerHospital = asyncHandler(async(req , res) => {
    const data  = req.body
    console.log(data)

    const createRoomDetails = await HospitalService(data)
    if(!createRoomDetails){
return res.status(404).json({
    success:false,
    message:"not created Room details"
})
    }

    return res.status(201).json({
        success:true,
        message:true,
        createRoomDetails
    })
})

export const headcontroller = asyncHandler(async(req , res) => {
    const data = req.user
    console.log(data.department)


    const headdata = await headservices(data)
    if(!headdata){
        const error  = new Error("not created")
        error.statuscode = 400
        throw error
    }
    return res.status(200).json({
        success:true,
        message:"DATA FETCHED",
        headdata
    })
    
})


export const updateroomcontroller = asyncHandler(async(req , res) => {
    const data = req.user
    const update = req.body

    console.log("djnjf",data._id , update)
    const updatecontroller = await updatehospitaldata(data._id , update)
    if(!updatecontroller){
        const error = new Error("update failed")
        error.statuscode = 404
        throw error
    }

    return res.status(201).json({
        success:true,
        message:"update successfully"
    })
})