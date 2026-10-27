import { employee } from "../Models/Employee.model.js";
import { EmployeeServices, empWorkdone } from "../services/Employee.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {AllEmployeeService , getemployeeByDepartmentService , CreateTaskService} from "../services/Employee.services.js";
import { getempwork } from "../repository/Employee.repositry.js";
import { findemployeeById , getdepartments} from "../repository/Employee.repositry.js";

export const employeeCreated = asyncHandler(async(req , res) => {
    const data = req.body
    const hospital = req.user.username
    console.log("data", data , "hospital", hospital)
   
    const file = req.file.path
   
    if(!file){
        return res.status(404).json({
            success:false,
            message:"file not uploaded"
        })
    }

    const employeeCreate = await EmployeeServices({ hospitalName: hospital  , data}, file)
    if(!employeeCreate){
        return res.status(404).json({
            success:false,
            message:"employee not crreated"
        })
    }

    return res.status(201).json({
        success:true,
        message:"Employee Created",
        employeeCreate  
    })

})

export const getAllEmployee = asyncHandler(async (req, res) => {
    const allEmployee = await AllEmployeeService();

    return res.status(200).json({
        success: true,
        message: "All employees retrieved successfully",
        data: allEmployee
    });

    })

export const worker = asyncHandler(async(req , res) =>  {
    const user = req.user
    const findemployee = await findemployeeById(user._id)
    if(!findemployee){
        return res.status(404).json({
            success:false,
            message:"employee not found"
        })
    }
    const findwork = await getempwork(user._id)
  



    return res.status(200).json({
        success:true,
        message:"employee work",
        data:findwork,
    })

    })

    export const getdepartmentsAll = asyncHandler(async(req , res) => {
        const departments = await getdepartments()
        

        return res.status(200).json({
            success:true,
            message:"departments retrieved successfully",
            data:departments
        })  
    })

    export const getfreeworkers = asyncHandler(async(req , res) => {
        const department = req.params.department;
        const employees = await getemployeeByDepartmentService(department);
       
        return res.status(200).json({
            success: true,
            message: "Free workers retrieved successfully",
            data: employees
        });
    })
export const CreateWorkerTask = asyncHandler(async(req , res) => {
    const data = req.params.employeeId
    const task = req.body
   


    const createTask = await CreateTaskService({employeeId:data , task:task})
    if(!createTask){
        return res.status(404).json({
            success:false,
            message:"task not created"
        })
    }
    return res.status(200).json({
        success:true,
        message:"task created successfully",
        data:createTask
    })

})

export const workDone = asyncHandler(async(req, res) => {
    const taskId = req.params.taskId
    const employeeId = req.user.id


    const getemployeupdate = await empWorkdone({employeeId , taskId})
    if(!getemployeupdate){
        return res.status(401).json({
            success:false,
            message:"updete failed"
        })
    }

    return res.status(201).json({
        success:true,
        message:"update successfully",
        data:getemployeupdate
    })


})