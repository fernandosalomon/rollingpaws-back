const AppointmentsModel = require("../models/appointments.model");
const DoctorModel = require("../models/doctor.model");

const getAllDoctorsService = async () => {
  try {
    const doctors = await DoctorModel.find();
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
    });

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

const getDoctorFreeHoursService = async (doctorID, date, month, year) => {

  let availableSlots = [];
  const timeJump = 30;

  const parseTime = (value) => {
    const hour = Math.floor(Number(value) / 60);
    const minutes = Number(value) - hour * 60;
    return `${hour < 10 ? "0" : ""}${hour}:${minutes < 10 ? "0" : ""
      }${minutes}`;
  };

  try {
    const doctorData = await DoctorModel.findOne({ _id: doctorID });
    const startHour =
      Number(doctorData.startWorkingHour.split(":")[0]) * 60 +
      Number(doctorData.startWorkingHour.split(":")[1]);
    const endHour =
      Number(doctorData.endWorkingHour.split(":")[0]) * 60 +
      Number(doctorData.endWorkingHour.split(":")[1]);

    const dayDict = {
      0: "Dom",
      1: "Lun",
      2: "Mar",
      3: "Mie",
      4: "Jue",
      5: "Vie",
      6: "Sab",
    }

    if (doctorData.workingDays.find((value) => value === dayDict[new Date(`${year}-${month}-${date}`).getUTCDay()])) {
      for (let hour = startHour; hour < endHour; hour = hour + timeJump) {
        availableSlots.push(hour);
      }
    }

    const bookedAppointments = await AppointmentsModel.find({ startDate: new Date(`${year}-${Number(month) < 10 ? "0" : ""}${Number(month)}-${Number(date) < 10 ? "0" : ""}${date}T00:00:00+00:00`), doctor: doctorID });

    bookedAppointments.map((appointment) => {
      const numberOfSlotsToRemove = (Number(appointment.endTime.split(":")[0]) - Number(appointment.startTime.split(":")[0])) * 2 + (Number(appointment.endTime.split(":")[1]) - Number(appointment.startTime.split(":")[1])) / 30

      const index = availableSlots.findIndex((value) => value === (Number(appointment.startTime.split(":")[0]) * 60 + Number(appointment.startTime.split(":")[1])));

      availableSlots.splice(index, numberOfSlotsToRemove);
    })

    const today = new Date();

    if (
      Number(date) === today.getDate() &&
      Number(month) === today.getMonth() + 1 &&
      Number(year) === today.getFullYear()
    ) {
      const actualTime = (today.getUTCHours() - 3) * 60 + today.getMinutes() + 30;
      const filteredSlots = availableSlots.filter((time) => time >= actualTime);
      availableSlots = [...filteredSlots];
    }

    availableSlots = availableSlots.map((slot) => parseTime(slot));

    return {
      statusCode: 200,
      data: availableSlots,
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Hubo un error tratando de recuperar los datos de la base de datos.",
    }
  }
}

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
  getDoctorFreeHoursService,
  createDoctorService,
  updateDoctorService,
  deleteDoctorService,
};
