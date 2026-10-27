import {v2 as cloudinary} from "cloudinary"
import { error } from "console"
import fs, { unlinkSync } from "fs"

 cloudinary.config({
        cloud_name:'dvogl4c7a',
        api_key:'248329574647344',
        api_secret:'2iCtnC6yiNpPDIu3QEKEqcHSvw8'
    })


export const uploadInCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null
        const file = await cloudinary.uploader.upload(localFilePath , {
            resource_type:"auto"
        })
        console.log("file uploaded successfully" ,file.url)

        return file
        
    } catch (error) {
        console.log("error comes" , error)
        fs.unlinkSync(localFilePath)
        return null
        
    }
}
