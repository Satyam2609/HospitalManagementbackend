import { controllerHospital, headcontroller, updateroomcontroller } from "../Controller/HospitalRoom.controller.js";
import {verifyUser} from "../Middleware/Auth.middleware.js"
import { Router } from "express";

const hostpitalroom = Router()

hostpitalroom.route("/create").post(controllerHospital)
hostpitalroom.route("/get").get(verifyUser , headcontroller)
hostpitalroom.route("/update").put(verifyUser , updateroomcontroller)
export default hostpitalroom