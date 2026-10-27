import { CreatePatientDetails, getAllPatents } from "../repository/Patients.repository.js";


export const createServicePatient = async(data) => {
    const patientservice = await CreatePatientDetails(data)
    return patientservice
}


export const getAllPatentsService = async () => {
  const data = await getAllPatents();

  return {
    totalPatients: data.count,
    patients: data.patients,
  };
};