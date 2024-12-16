const DoctorModel = require("../models/doctor.model");

const getAllDoctorsService = async () => {
  try {
    const doctors = await DoctorModel.find().populate("user");
    return {
      data: doctors,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message:
        "Hubo un error tratando de recuperar los datos de la base de datos.",
      statusCode: 500,
    };
  }
};

const getDoctorByIdService = async (doctorID) => {
  try {
    const doctor = await DoctorModel.findOne({
      _id: doctorID,
    }).populate("user");

    if (!doctor) {
      return {
        message: "El ID no corresponde con un veterinario registrado.",
        statusCode: 400,
      };
    } else {
      return { data: doctor, statusCode: 200 };
    }
  } catch (error) {
    console.log(error);
    return {
      message:
        "Hubo un error tratando de recuperar los datos de la base de datos.",
      statusCode: 500,
    };
  }
};

const createDoctorService = async (body) => {
  const { user, workingDays, startWorkingHour, endWorkingHour, description } =
    body;

  if (!user || !workingDays || !startWorkingHour || !endWorkingHour) {
    return {
      message: "Faltan completar campos obligatorios",
      statusCode: 400,
    };
  } else {
    const newDoctor = new DoctorModel({
      user,
      workingDays,
      startWorkingHour,
      endWorkingHour,
      description,
    });
    try {
      const createdNewDoctor = await newDoctor.save();
      return {
        data: createdNewDoctor,
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);
      return {
        message:
          "Hubo un error al tratar de crear al nuevo veterinario en la base de datos.",
        statusCode: 500,
      };
    }
  }
};

const updateDoctorService = async (doctorID, body) => {
  try {
    const doctorExists = await DoctorModel.findById(doctorID);

    if (!doctorExists) {
      return {
        message: "El ID no corresponde con ningún veterinario registrado.",
        statusCode: 400,
      };
    } else {
      const updatedDoctor = await DoctorModel.findByIdAndUpdate(
        doctorID,
        body,
        {
          new: true,
        }
      );
      return { data: updatedDoctor, statusCode: 200 };
    }
  } catch (error) {
    console.log(error);
    return {
      message:
        "Ocurrio un error tratando de actualizar los datos del veterinario.",
      statusCode: 500,
    };
  }
};

const deleteDoctorService = async (doctorID) => {
  try {
    const deletedDoctor = await DoctorModel.findByIdAndDelete(doctorID);
    return {
      data: deletedDoctor,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Ocurrio un error tratando de eliminar al veterinario.",
      statusCode: 500,
    };
  }
};

module.exports = {
  getAllDoctorsService,
  getDoctorByIdService,
  createDoctorService,
  updateDoctorService,
  deleteDoctorService,
};
