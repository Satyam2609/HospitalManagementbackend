import {Router} from "express"
import { getAllpatientsRecord, getDepartments, pateintcontroller } from "../Controller/Hospitalanalysis.js"

const analysisRecord = Router()

analysisRecord.route("/patientrecord").get(pateintcontroller)
analysisRecord.route("/getdepartments").get(getDepartments)
analysisRecord.route("/gettotalpatients/:numberdays").get(getAllpatientsRecord)
analysisRecord.route("/departmentsfor").get(getDepartments)
export default analysisRecord


