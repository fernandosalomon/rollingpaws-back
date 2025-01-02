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

const getDoctorFreeHoursService = async (doctorID, selectedDate) => {
  let freeHourList = [];
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

    if (doctorData.workingDays.find((value) => value === dayDict[new Date(selectedDate).getDay()])) {
      for (let hour = startHour; hour < endHour; hour = hour + timeJump) {
        freeHourList.push(hour);
      }

      const vetAppointments = await AppointmentsModel.find({ doctor: doctorID });

      vetAppointments.map((appointment) => {
        if (
          new Date(appointment.startDate).getFullYear() ===
          new Date(selectedDate).getFullYear() &&
          new Date(appointment.startDate).getMonth() ===
          new Date(selectedDate).getMonth() &&
          new Date(appointment.startDate).getDate() ===
          new Date(selectedDate).getDate()
        ) {
          const appointmentStart =
            new Date(appointment.startDate).getHours() * 60 +
            new Date(appointment.startDate).getMinutes() + new Date(appointment.startDate).getTimezoneOffset();

          const appointmentEnd =
            new Date(appointment.endDate).getHours() * 60 +
            new Date(appointment.endDate).getMinutes() + new Date(appointment.endDate).getTimezoneOffset();

          const tempArray = freeHourList.filter(
            (hour) => !(hour >= appointmentStart && hour < appointmentEnd)
          );

          freeHourList = [...tempArray];
        }
      });

      freeHourList = freeHourList.map((hour) => parseTime(hour));

      return {
        data: freeHourList,
        statusCode: 200,
      };
    } else {
      return {
        data: [],
        statusCode: 200,
      }
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
  getDoctorFreeHoursService,
  createDoctorService,
  updateDoctorService,
  deleteDoctorService,
};
