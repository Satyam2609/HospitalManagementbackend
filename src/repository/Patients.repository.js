import { patientdetails } from "../Models/Patients.model.js";


export const CreatePatientDetails = async(data) => {
    return await patientdetails.create({
        patientname:data.patientname,
        department:data.department,
        location:data.location,
        problem:data.problem,
        gurdian:data.gurdian,
        gurdiancounts:data.gurdiancounts,
        applicationStatus:"panding",
        doctor:data.doctor

    })
}

export const getAllPatents = async () => {
  const count = await patientdetails.countDocuments();
  const patients = await patientdetails.find();

  return {
    count,
    patients,
  };
};


