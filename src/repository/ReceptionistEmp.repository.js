import {employee} from "../Models/Employee.model.js";

export const getFreeDoctors =async(department) => {
    return await employee.aggregate([
        {
            $match:{
                department:department,
                workertype:"Doctor",
                isAvailable:true
            }
        }
    ])
}