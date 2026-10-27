import { employeeCreated } from "../Controller/Employee.controller.js";
import { EmployeeCreate, FindEmployee , getAllEmployee , getdepartments , getemployeeByDepartment ,CreateTask, updateWorkdone} from "../repository/Employee.repositry.js";
import { uploadInCloudinary } from "../utils/Cloudinary.js";



export const EmployeeServices = async(data , file) => {
    const employee = data.employee?.[0];
    console.log("employee", data);

    if (
        !data.data.department ||
        !data.data.name ||
        !data.data.work ||
        !data.data.email ||
        !data.data.phone ||
        !data.data.salary
    ) {
        const error = new Error("All fields are required");
        error.statuscode = 400;
        throw error;
    }
    

    const exsistEmployee = await FindEmployee(data.email)
    if(exsistEmployee){
        const error = new Error("worker already avilable")
        error.statuscode = 404
        throw error
    }

    const uploadinCloudinaryfile = await uploadInCloudinary(file)
        if(!uploadinCloudinaryfile){
            const error = new Error("File not uploaded")
            error.statusCode = 404
            throw error
        } 
    const createEmployee = await EmployeeCreate(data , uploadinCloudinaryfile)
    
    return createEmployee
}


export const AllEmployeeService = async () => {
    const allEmployee = await getAllEmployee();
    if(!allEmployee || allEmployee.length === 0){
        const error = new Error("No employees found");
        error.statuscode = 404;
        throw error;
    }
    return allEmployee;
}

export const employeeWorks = async(dataId) => {
    const findempwork = await getempwork(dataId)
    return findempwork
}
export const getdepartmentservice = async() => {
    const departments = await getdepartments()
    return departments
}


export const getemployeeByDepartmentService = async(department) => {
    const employees = await getemployeeByDepartment(department) 
    return employees
}

export const CreateTaskService = async (data) => {

    const createTask = await CreateTask(data);

    console.log(createTask);

    return createTask;
};

export const empWorkdone = async(data) => {
    console.log("djnd",data)
    const findemployework = await updateWorkdone(data)
    return findemployework
}

export const profiledataemployee = async(id) => {

}