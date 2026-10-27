import { Router } from "express";
import { employeeCreated, workDone } from "../Controller/Employee.controller.js";
import { getAllEmployee } from "../Controller/Employee.controller.js";
import { upload } from "../Middleware/Multer.middleware.js";
import { worker , getdepartmentsAll} from "../Controller/Employee.controller.js";
import {verifyUser} from "../Middleware/Auth.middleware.js"
import { getfreeworkers , CreateWorkerTask } from "../Controller/Employee.controller.js";
const employee = Router()

employee.route("/create").post(upload.single("profilePhoto") ,verifyUser, employeeCreated)
employee.route("/getAll").get(getAllEmployee)
employee.route("/getwork").get(verifyUser, worker)
employee.route("/getdepartments").get(getdepartmentsAll)
employee.route("/getfreeworkers/:department").get(getfreeworkers)
employee.route("/CreateTask/:employeeId").post(CreateWorkerTask)
employee.route("/updatetask/:taskId").post(verifyUser , workDone)
export default employee