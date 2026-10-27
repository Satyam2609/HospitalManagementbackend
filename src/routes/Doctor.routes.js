import {Router} from "express"
import { getpatient, updteapplication  , getcompletepateint , gettotalpateint , profileupdate} from "../Controller/Doctor.controller.js"
import { verifyUser } from "../Middleware/Auth.middleware.js"
import {upload} from "../Middleware/Multer.middleware.js"

const routerDoctor = Router()

routerDoctor.route("/update").post(updteapplication)
routerDoctor.route("/getAll").get(verifyUser,getpatient)
routerDoctor.route("/getComplete").get(verifyUser,getcompletepateint)
routerDoctor.route("/getTotal").get(verifyUser,gettotalpateint)
routerDoctor.route("/profile").put(upload.single("profilePhoto"),verifyUser,profileupdate)

export default routerDoctor