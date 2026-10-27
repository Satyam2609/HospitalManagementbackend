import { CreateHospitalRoom, findheadroom } from "../repository/Hospital.repository.js";
import { updateposostion } from "../repository/Hospital.repository.js";
import { getRoomDeatils } from "../repository/PatientRoom.repository.js";

export const HospitalService = async(data) => {
    const hosroom = await CreateHospitalRoom(data)
    const findid = await findheadroom(data)
    if(!findid){
        const updatehead = await updateposostion(data)
    }
    return hosroom
}

export const headservices = async(data) => {
    const head = await getRoomDeatils(data)
    if(!head){
const error = new Error("head not fetched")
error.statusCode = 404
throw error
    }

    return head
}
