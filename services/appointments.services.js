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
  const { startDate, endDate, doctor, pet, observations } = body;

  if (!startDate || !startDate || !doctor || !pet) {
    return {
      message: "Faltan completar campos obligatorios",
      statusCode: 400,
    };
  } else {
    const appointment = new AppointmentsModel({
      startDate,
      endDate,
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
      updateDoctorService(doctor, { appointment: newAppointmentList });
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
};

const updateAppointmentService = async (appointmentID, body) => {
  try {
    const appointmentExists = await AppointmentsModel.findById(appointmentID);

    if (!appointmentExists) {
      return {
        message: "El ID no corresponde con ninguna cita.",
        statusCode: 400,
      };
    } else {
      const updatedAppointment = await AppointmentsModel.findByIdAndUpdate(
        appointmentID,
        body,
        {
          new: true,
        }
      );
      return { data: updatedAppointment, statusCode: 200 };
    }
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
