import { employee } from "../Models/Employee.model.js";
import { patientdetails } from "../Models/Patients.model.js";




export const updatepateintstatus = async (data) => {
  return await patientdetails.findByIdAndUpdate(
    data._id,
    {
      $set: {
        applicationStatus: data.status,
      },
    },
   {
    returnDocument: "after",
    runValidators: true
  }
  );
};



export const getDoctorsWithPatients = async (data) => {

  const result = await employee.aggregate([

    // Department ke doctors
    {
      $match: {
        department: data.doctor,
        workertype: "doctor"
      }
    },

    {
  $lookup: {
    from: "patients",

    let: {
      doctorDepartment: "$department"
    },

    pipeline: [
      // 1. Same department
      {
        $match: {
          $expr: {
            $eq: [
              "$department",
              "$$doctorDepartment"
            ]
          }
        }
      },

      // 2. Complete patients ko yahin hata do
      {
        $match: {
          applicationStatus: {
            $ne: "Complete"
          }
        }
      },

      // 3. Maximum 10 patients
      {
        $limit: 10
      }
    ],

    as: "patients"
  }
},

    // patients array ko documents mein convert karo
    {
      $unwind: "$patients"
    },

    // Sirf patient ka document return karo
    {
      $replaceRoot: {
        newRoot: "$patients"
      }
    },
    {
      $addFields: {
        sortOrder: {
          $switch: {
            branches: [
              {
                case: { $eq: ["$applicationStatus", "Accept"] },
                then: 1,
              },
              {
                case: { $eq: ["$applicationStatus", "panding"] },
                then: 2,
              },
              {
                case: { $eq: ["$applicationStatus", "rejected"] },
                then: 3,
              },
              {
                case: { $eq: ["$applicationStatus", "Complete"] },
                then: 4,
              },
            ],
            default: 5,
          },
          
        },
      },
    },
    
    {
      $sort: {
        sortOrder: 1,
        _id: 1,
      },
    },
    {
      $project: {
        sortOrder: 0,
      },
    },

  ]);

  console.log("Patients:", result);

  return result;
};

export const updatecompletedPatent = async(data) => {
  return await patientdetails.find({
   department:data.department,
   applicationStatus: "Complete"
  })

}


export const gettotalp = async (data) => {
  const result = await patientdetails.countDocuments({
    doctor: data
  });

  return {
    totalPatients: result
  };
};

export const doctorProfile = async (data, upload) => {
  try {
    const updateData = {};

    const updatedata = data.updatedata;

    console.log("OLD DATA:", data.data);
    console.log("UPDATED DATA:", updatedata);
    console.log("UPLOAD:", upload);

    // Employee fields
    if (updatedata.name !== undefined) {
      updateData.name = updatedata.name;
    }

    if (updatedata.email !== undefined) {
      updateData.email = updatedata.email;
    }

    if (updatedata.phone !== undefined) {
      updateData.phone = updatedata.phone;
    }

    // Doctor fields
    if (updatedata.specialization !== undefined) {
      updateData["doctor.specialization"] =
        JSON.parse(updatedata.specialization);
    }

    if (updatedata.experience !== undefined) {
      updateData["doctor.experience"] = updatedata.experience;
    }

    if (updatedata.education !== undefined) {
      updateData["doctor.education"] =
        JSON.parse(updatedata.education);
    }

    // Profile photo
    if (upload?.url) {
      updateData.profilePhoto = upload.url;
    }

    console.log("FINAL updateData:", updateData);

    const profile = await employee.findByIdAndUpdate(
      data.data._id,
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("UPDATED PROFILE:", profile);

    return profile;
  } catch (error) {
    console.error("doctorProfile error:", error);
    throw error;
  }
};

export const getDoctorrepository = async (dep) => {
  return await employee.aggregate([
  {
    $match: {
      department: "Surgeon",
      workertype: "doctor"
    }
  },
  {
    $lookup: {
      from: "patients",
      let: {
        doctorName: "$name"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$doctor", "$$doctorName"]
            }
          }
        }
      ],
      as: "assignedPatients"
    }
  },
  {
    $addFields: {
      patientCount: {
        $size: "$assignedPatients"
      }
    }
  },
  {
    $match: {
      patientCount: {
        $lt: 10
      }
    }
  },
  {
    $project: {
      name: 1,
      department: 1,
      patientCount: 1
    }
  }
])



}