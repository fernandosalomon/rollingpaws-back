const AppointmentsModel = require("../models/appointments.model");
const {
  updateDoctorService,
  getDoctorByIdService,
} = require("./doctor.services");

const getAllAppointmentsService = async () => {
  try {
    const appointments = await AppointmentsModel.find().populate("pet")
    return {
      data: appointments,
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

const getAppointmentsByIdService = async (appointmentID) => {
  try {
    const appointment = await AppointmentsModel.findOne({
      _id: appointmentID,
    }).populate("pet");
    if (!appointment) {
      return {
        message: "El ID no corresponde con una cita registrada.",
        statusCode: 400,
      };
    } else {
      return { data: appointment, statusCode: 200 };
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

const getUserAppointmentsService = async (userID) => {
  try {
    const appointments = await AppointmentsModel.find({
      user: userID,
    }).populate("pet").populate("doctor");
    return { data: appointments, statusCode: 200 };

  } catch (error) {
    console.log(error);
    return {
      message:
        "Hubo un error tratando de recuperar los datos de la base de datos.",
      statusCode: 500,
    };
  }
}

const createAppointmentService = async (body, userID) => {
  const { startDate, startTime, endDate, endTime, doctor, pet, observations } = body;

  if (!startDate || !startTime || !endDate || !endTime || !doctor || !pet) {
    return {
      message: "Faltan completar campos obligatorios",
      statusCode: 400,
    };
  }

  if (new Date(startDate) > new Date(endDate)) {
    return {
      message: "La fecha de inicio no puede ser posterior a la de finalización",
      statusCode: 400,
    };
  }

  if (
    new Date(startDate).getDate() === new Date(endDate).getDate() &&
    new Date(startDate).getMonth() === new Date(endDate).getMonth() &&
    new Date(startDate).getFullYear() === new Date(endDate).getFullYear() &&
    Number(startTime.split(":")[0]) > Number(endTime.split(":")[0])) {
    return {
      message: "La hora de inicio no puede ser posterior a la de finalización",
      statusCode: 400,
    };
  }

  if (Number(startTime.split(":")[0]) === Number(endTime.split(":")[0]) && Number(startTime.split(":")[1]) > Number(endTime.split(":")[1])) {
    return {
      message: "La hora de inicio no puede ser posterior a la de finalización",
      statusCode: 400,
    };
  }

  const today = new Date();

  if (
    new Date(startDate).getUTCDate() === today.getUTCDate() &&
    new Date(startDate).getUTCMonth() === today.getUTCMonth() &&
    new Date(startDate).getUTCFullYear() === today.getUTCFullYear() &&
    Number(startTime.split(":")[0]) <= (today.getUTCHours() - 3)
  ) {
    return {
      message: "Los turnos solo pueden reservarse con una hora de anticipación.",
      statusCode: 400,
    };
  }

  const appointment = new AppointmentsModel({
    startDate,
    startTime,
    endDate,
    endTime,
    doctor,
    pet,
    observations,
    user: userID,
  });
  try {
    const createdAppointment = await appointment.save();
    const doctorData = await getDoctorByIdService(doctor);
    const newAppointmentList = doctorData.data.appointments;
    newAppointmentList.push(appointment);
    updateDoctorService(doctor, { appointments: newAppointmentList });
    return {
      data: createdAppointment,
      statusCode: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      message:
        "Hubo un error al tratar de crear la cita en la base de datos.",
      statusCode: 500,
    };
  }
}

const updateAppointmentService = async (appointmentID, body) => {

  try {
    const appointmentExists = await AppointmentsModel.findById(appointmentID);

    if (!appointmentExists) {
      return {
        message: "El ID no corresponde con ninguna cita.",
        statusCode: 400,
      };
    }

    const startDate = body.startDate ? body.startDate : appointmentExists.startDate;
    const startTime = body.startTime ? body.startTime : appointmentExists.startTime;
    const endDate = body.endDate ? body.endDate : appointmentExists.endDate;
    const endTime = body.endTime ? body.endTime : appointmentExists.endTime;
    const today = new Date();

    if (new Date(startDate).getUTCFullYear() < today.getFullYear()) {
      return {
        message: "La fecha de inicio no puede ser anterior a la fecha actual",
        statusCode: 400,
      };
    } else if (new Date(startDate).getUTCFullYear() === today.getFullYear()) {
      if (new Date(startDate).getUTCMonth() < today.getMonth()) {
        return {
          message: "La fecha de inicio no puede ser anterior a la fecha actual",
          statusCode: 400,
        };
      } else if (new Date(startDate).getUTCDate() < today.getDate()) {
        return {
          message: "La fecha de inicio no puede ser anterior a la fecha actual",
          statusCode: 400,
        };
      }
    }

    if (
      new Date(startDate).getUTCDate() === today.getDate() &&
      new Date(startDate).getUTCMonth() === today.getMonth() &&
      new Date(startDate).getUTCFullYear() === today.getFullYear() &&
      Number(startTime.split(":")[0]) <= (today.getUTCHours() - 3)
    ) {
      return {
        message: "La hora de inicio no puede ser anterior a la actual",
        statusCode: 400,
      };
    } else if (Number(startTime.split(":")[0]) === today.getHours()) {
      if (Number(startTime.split(":")[1]) < today.getMinutes()) {
        return {
          message: "La hora de inicio no puede ser anterior a la actual",
          statusCode: 400,
        };
      }
    }

    if (
      new Date(startDate).getDate() === today.getDate() &&
      new Date(startDate).getMonth() === today.getMonth() &&
      new Date(startDate).getFullYear() === today.getFullYear() &&
      Number(endTime.split(":")[0]) <= (today.getUTCHours() - 3)
    ) {
      return {
        message: "La hora de inicio no puede ser anterior a la actual",
        statusCode: 400,
      };
    } else if (Number(endTime.split(":")[0]) === today.getHours()) {
      if (Number(endTime.split(":")[1]) < today.getMinutes()) {
        return {
          message: "La hora de inicio no puede ser anterior a la actual",
          statusCode: 400,
        };
      }
    }

    if (new Date(startDate) > new Date(endDate)) {
      return {
        message: "La fecha de inicio no puede ser posterior a la de finalización",
        statusCode: 400,
      };
    }

    if (
      new Date(startDate).getUTCDate() === new Date(endDate).getUTCDate() &&
      new Date(startDate).getUTCMonth() === new Date(endDate).getUTCMonth() &&
      new Date(startDate).getUTCFullYear() === new Date(endDate).getUTCFullYear()
    ) {
      if (Number(startTime.split(":")[0]) > Number(endTime.split(":")[0])) {
        return {
          message: "La hora de inicio no puede ser posterior a la de finalización",
          statusCode: 400,
        };
      } else if (Number(startTime.split(":")[0]) === Number(endTime.split(":")[0])) {
        if (Number(startTime.split(":")[1]) >= Number(endTime.split(":")[1])) {
          return {
            message: "La hora de inicio no puede ser posterior o igual a la de finalización",
            statusCode: 400,
          };
        }
      }
    }

    const updatedAppointment = await AppointmentsModel.findByIdAndUpdate(
      appointmentID,
      body,
      {
        new: true,
      }
    );
    return { data: updatedAppointment, statusCode: 200 };

  } catch (error) {
    console.log(error);
    return {
      message: "Ocurrio un error tratando de actualizar los datos de la cita.",
      statusCode: 500,
    };
  }
};

const deleteAppointmentService = async (appointmentID) => {
  try {
    const deletedAppointment = await AppointmentsModel.findByIdAndDelete(
      appointmentID
    );
    return {
      data: deletedAppointment,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Ocurrio un error tratando de eliminar la cita.",
      statusCode: 500,
    };
  }
};

module.exports = {
  getAllAppointmentsService,
  getAppointmentsByIdService,
  getUserAppointmentsService,
  createAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
};
