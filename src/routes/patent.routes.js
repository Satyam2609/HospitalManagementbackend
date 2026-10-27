import {Router} from "express"
import { createpatient, getpt } from "../Controller/patient.controller.js"
import { onlyReception } from "../Middleware/Authentication.middleware.js"
import { verifyUser } from "../Middleware/Auth.middleware.js"

const petientroute = Router()

petientroute.route("/create").post(verifyUser, onlyReception, createpatient)
petientroute.route("/getAll").get(getpt)

export default petientroute