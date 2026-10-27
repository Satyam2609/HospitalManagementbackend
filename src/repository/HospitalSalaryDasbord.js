import { employee } from "../Models/Employee.model.js";
import { HospitalRoom } from "../Models/Hospitals.model.js";
import { patientdetails } from "../Models/Patients.model.js";


export const salaryDashboard = async() => {
    return employee.aggregate([
        {
            $match:{
                workertype:"doctor"
            }
        },
        {
           $unwind:"$specialization"
        },
        {
            $group:{
                _id:"$specialization",
                doctors:{
                     $push: {
          name: "$name",
          salary: "$salary"
        }
                },
                totalmoneyuse:{
                    $sum:"$salary"
                }
            }
        },
        {
            $project:{
                _id:0,
                specialization:"$_id",
                doctors:1,
                totalmoneyuse:1

            }
        }
    ])
}



export const PatientRecords = async (data) => {
  const date =  new Date();

  const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;
  console.log(formattedDate)

  return patientdetails.aggregate([
    {
      $match: {
        department: data.department || "Surgeon",
      },
    },
    {
      $project: {
        department: 1,
        createdAt: {
          $dateToString: {
            format: "%d-%m-%Y",
            date: "$createdAt",
            timezone: "Asia/Kolkata",
          },
        },
      },
    },
    {
      $match: {
        createdAt: data.targetDate || formattedDate,
      },
    },
    {
      $group: {
        _id: "$department",
        total: { $sum: 1 },
        createdAt: { $first: "$createdAt" },
      },
    },
  ]);
};

export const getallpateintrecord =async (days) => {
  const numberOfDays = Number(days);

  if (![7, 10, 15, 30].includes(numberOfDays)) {
    throw new Error("Days must be 7, 10, 15, or 30");
  }

  const startDate = new Date(
    Date.now() - numberOfDays * 24 * 60 * 60 * 1000
  );

  const result = await patientdetails.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: new Date(),
        },
      },
    },
    {
      $group: {
        _id: "$department",
        totalPatients: { $sum: 1 },
      },
    },
    {
      $sort: {
        totalPatients: -1,
      },
    },
  ]);

  return {
    days: numberOfDays,
    departments: result,
  };
};
export const getAllDepartment = async() => {
    const dep = employee.aggregate([
{
    $group:{
        _id:"$department",
    }
}

    ])
    console.log(dep)
    return dep
}