import { createServicePatient, getAllPatentsService } from "../services/patient.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createpatient = asyncHandler(async(req , res) => {
    const patientdata = req.body
    console.log("sfknf",req.body)

    const createdata = await createServicePatient(patientdata)
    if(!createdata){
        return res.status(401).json({
            success:false,
            message:"not created"
        })

    }

    return res.status(201).json({
        success:true,
        message:"created successfully"
    })
})

export const getpt = asyncHandler(async(req , res) => {
    const patent = await getAllPatentsService()
    console.log(patent)
    return res.status(201).json({
        success:false,
        message:"get all patient",
        data:patent
    })
})

