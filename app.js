import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./src/routes/user.routes.js"
import employee from "./src/routes/Employee.routes.js"
import permission from "./src/routes/Permission.route.js"
import petientroute from "./src/routes/patent.routes.js"
import routerDoctor from "./src/routes/Doctor.routes.js"
import hostpitalroom from "./src/routes/Hospital.routes.js"
import analysisRecord from "./src/routes/HospitalAnlysis.route.js"

const app = express()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json({limit:"10kb"}))
app.use(express.static("public"))
app.use(express.urlencoded({extended:true , limit:"10kb"}))
app.use(cookieParser())

app.use("/api/user" , authRouter)
app.use("/api/employee" , employee)
app.use("/api/permissions" , permission)
app.use("/api/patient" , petientroute)
app.use("/api/doctor" , routerDoctor)
app.use("/api/hospital" , hostpitalroom)
app.use("/api/analysis" , analysisRecord)


export default app