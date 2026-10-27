import { getallp, updatePatient , getupdatePatients , gettotalservicep , profileservices } from "../services/Doctor.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const updteapplication = asyncHandler(async(req , res) => {
    const data = req.body
console.log(data)
    const update = await updatePatient(data)
    if(!update){
        return res.status(401).json({
            success:false,
            message:"failed to update"
        })
    }

    return res.status(200).json({
        success:false,
        message:"done updated",
    })
})

export const getpatient = asyncHandler(async(req , res) => {
    const currentdepartment = req.user.department
    console.log("fjng",currentdepartment)
    const getall = await getallp({ doctor: currentdepartment })
    console.log(getall)
    if(!getall){
        return res.status(404).json({
            success:false,
            message:"no patient"
        })
    }

    console.log("getall",getall)

    return res.status(201).json({
            success:true,
            message:"get",
            data:getall
        })


})

export const getcompletepateint = asyncHandler(async(req , res) => {
    const data = req.user
    console.log("data",data)

    const coom = await getupdatePatients(data)
    if(!coom){
        return res.status(404).json({
            success:false,
            message:"no patient"
        })
    }
    return res.status(201).json({
        success:true,
        message:"get",
        data:coom
    })
})


export const gettotalpateint = asyncHandler(async(req , res) => {
    const data = req.user.name
    console.log("data",data)
    const total = await gettotalservicep(data)
    if(!total){
        return res.status(404).json({
            success:false,
            message:"no patient"
        })
    }
    console.log("total",total)
    return res.status(201).json({
        success:true,
        message:"get",
        data:total
    })

})

export const profileupdate = asyncHandler(async (req, res) => {
  const data = req.user;
  const updatedata = req.body;
  console.log("data:", updatedata);
  const file = req.file; // photo optional hai

  const profile = await profileservices({
    data,
    updatedata,
    file,
  });

  if (!profile) {
    return res.status(404).json({
      success: false,
      message: "Patient not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: profile,
  });
});
