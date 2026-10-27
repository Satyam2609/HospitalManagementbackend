import { employee } from "../Models/Employee.model.js";

export const FindEmployee = async(eId) => {
    return await employee.findOne({email:eId})
}
export const EmployeeCreate = async (data, uploadinCloudinaryfile) => {
  const count = await employee.countDocuments();
  console.log(data.hospitalName)

  const password = data.password || `employee${count + 1}`;

  const employeeData = {
    employeId: crypto.randomUUID(),

    profilePhoto: uploadinCloudinaryfile.url,

    department: data.data.department,
    work: data.data.work,
    name: data.data.name,
    email: data.data.email,
    phone: data.data.phone,
    password,
    salary: data.data.salary,
    hospitalName: data.hospitalName,
    currentWork: [
      {
        title: data.data.work,
        status: "pending",
        Activity: "free",
      },
    ],

    commonWork: [
      {
        title: data.commontask || "",
      },
    ],

    workertype: data.data.workertype,
    workerposition:data.data.workerposition
  };

  // Doctor hai toh doctor ka data add karo
  if (data.data.workertype === "doctor") {
    employeeData.doctor = {
      specialization: data.specialization || "degree not provided",
      experience: data.experience || "experience not provided",
      education:[{ degree: data.degree || "degree not provided", institution: data.institution || "institution not provided", year: data.year || 0 }] ,
    };
  }

  return await employee.create(employeeData);
};

export const getAllEmployee = async () => {
    return await employee.find();
}
export const findemployeeById = async (dataId) => {
    return await employee.findById(dataId);
}
export const getempwork = async(dataId) => {
return await employee.findById(dataId).select("currentWork")
}
export const getdepartments = async() => {
    return await employee.distinct("department")
}
export const getemployeeByDepartment = async(department) => {
    return await employee.find({
        department: department,
        currentWork: { $elemMatch: { Activity: "free" } }
    })
}

export const CreateTask = async (data) => {

    console.log(data.employeeId, data.task.common);

    if (data.task.common === "common TASK") {

        return await employee.findByIdAndUpdate(
            data.employeeId,
            {
                $push: {
                    "CommonWork": {
                        title: data.task.title,
                        status:"panding"
                    }
                }
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

    } else {

        return await employee.findByIdAndUpdate(
            data.employeeId,
            {
                $push: {
                    currentWork: {
                        title: data.task.title,
                        status: "pending",
                        Activity: "free"
                    }
                }
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

    }
};

export const updateWorkdone = async (data) => { 
  const updatedEmployee = await employee.findOneAndUpdate(
    {
      _id: data.employeeId,
      "currentWork._id": data.taskId,
    },
    {
      $set: {
        "currentWork.$.status": "completed",
        "currentWork.$.Activity": "free",
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  console.log("Updated Employee:", updatedEmployee);

  return updatedEmployee;
};

export const allowForm = async () => {
  return await employee.find({
    department: "reception"
  });
};



