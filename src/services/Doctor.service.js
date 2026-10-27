import { updatepateintstatus , getDoctorsWithPatients , updatecompletedPatent, gettotalp , doctorProfile } from "../repository/Doctor.repository.js";
import { uploadInCloudinary } from "../utils/Cloudinary.js";

export const updatePatient = async(data) => {
    const updatePateint = await updatepateintstatus(data)
    console.log("updatePateint",updatePateint)
    return updatePateint
}

export const getupdatePatients = async(data) => {
    const complete = await updatecompletedPatent(data)
    return complete
}

export const getallp = async(data) => {
    const get = await getDoctorsWithPatients(data)
    return get
}


export const gettotalservicep = async(data) => {
    const total = await gettotalp(data)
    console.log("total",total)
    return total
}

export const profileservices = async (data) => {
  let upload = null;
  console.log("data received in service:");

  if (data.file !== undefined) {
    upload = await uploadInCloudinary(data.file.path);

    if (!upload) {
      throw new Error("Error uploading file to Cloudinary");
    }

    console.log("upload:", upload.secure_url);
  }
  console.log("data dmfekg:", data);

  const profile = await doctorProfile(data , upload);

  return profile;
};