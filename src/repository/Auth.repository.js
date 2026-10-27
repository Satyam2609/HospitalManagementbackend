import { User } from "../Models/User.model.js";
import { employee } from "../Models/Employee.model.js";

export const FindEmail = async(email) => {
    return await User.findOne({email})

}
export const FindEmployee = async(email) => {
    return await employee.findOne({email})
}

export const createUser = async(data , uploadinCloudinaryfile) => {
    return await User.create({
        username:data.username,
        email:data.email,
        password:data.password,
        role:data.role || "patient",
        avatar:uploadinCloudinaryfile.url
    })
}

export const findLogin = async(email) => {
    return await User.findOne({email})
}
export const logged =  async(dataId) => {
    return await User.findById(dataId).select("-password -refreshtoken")

}

