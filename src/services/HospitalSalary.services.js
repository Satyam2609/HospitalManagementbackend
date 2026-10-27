import { getAllDepartment, PatientRecords } from "../repository/HospitalSalaryDasbord.js";


export const patientrecordservices = async(data) => {
    const patientrecord = await PatientRecords(data)
    console.log("idn" , patientrecord)
    if(!patientrecord){
        const error = new Error("patient Record not Found")
        error.statuscode = 404
        throw error
    }
    return patientrecord
}
