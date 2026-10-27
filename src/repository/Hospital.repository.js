
import { employee } from "../Models/Employee.model.js";
import { HospitalRoom } from "../Models/Hospitals.model.js";
import hostpitalroom from "../routes/Hospital.routes.js";



export const CreateHospitalRoom = async (data) => {
  const room = data.HosptialPaRoom?.[0];

  if (!room) {
    throw new Error("HosptialPaRoom array is missing or empty");
  }

  console.log("Room number:", room.Hosptialroomno);

  // Array ke andar room number check karo
  const checkemployee = await HospitalRoom.findOne({
    "HospitalPaRoom.Hospitalroomno": room.Hosptialroomno
  });

  console.log("Existing room:", checkemployee);

  if (checkemployee) {
    throw new Error("Room already allocated");
  }

  const createroom = await HospitalRoom.create({
    HospitalPaRoom: [
      {
        Hospitalroomno: room.Hosptialroomno,
        Patient: Number(room.Patient),
        department: room.department,
        Bads: Number(room.FreeBad)
      }
    ],

    Hospitalstaff: data.Hospitalstaff,
    staffId: data.employeeId,

    medicalEquipments: (data.medicalEquipments ?? []).map((item) => ({
      name: item.name,
      category: item.category,
      quantity: Number(item.quantity),
      price: item.price,
      availableQuantity: Number(item.availableQuantity),
      status: item.status
    })),
    underWorkingStaff:[{
      staffId:"",
      staffName:""
    }]
  });

  return createroom;
};






export const updatehospitaldata = async (_id, updateData) => {
  console.log("Room staffId:", _id);
  console.log("Staff list:", updateData.underWorkingStaff);

  const result = await HospitalRoom.findOneAndUpdate(
    { staffId: _id },
    {
      $set: {
        underWorkingStaff: updateData.underWorkingStaff,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  console.log("Updated room:", result);

  return result;
};




export const findheadroom = async(data) => {
    console.log("dnfj",data.employeeId)
    const findhospitalroom = await HospitalRoom.findById(
        data.employeeId
    )
    console.log(findhospitalroom)
    return findhospitalroom
}

export const updateposostion = async (data) => {
    console.log("dndj" ,data)
 const update = await employee.findByIdAndUpdate(
    data.employeeId,
    {
      $set: {
        workerposition:"head"
      },
    },
    { new: true }
  );
  console.log("fjnf",update)
};
export const checkFreestaff = async (depart) => {
    console.log(depart);

 return employee.aggregate([
    {
        $match: {
            department: depart
        }
    },
    {
        $group: {
            _id: {
                employeeId: "$_id",
                name: "$name"
            },
            countcheck: { $sum: 1 }
        }
    },
    {
        $match: {
            countcheck: { $lte: 10 }
        }
    },
    {
        $project: {
            _id: 0,
            employeeId: "$_id.employeeId",
            name: "$_id.name",
            countcheck: 1
        }
    }
]);
};


