const AppointmentsModel = require("../models/appointments.model");

const getAllAppointmentsService = async () => {
  try {
    const appointments = await AppointmentsModel.find().populate("pet");
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

const createAppointmentService = async (body) => {
  const { date, doctor, pet, observations } = body;

  if (!date || !doctor || !pet) {
    return {
      message: "Faltan completar campos obligatorios",
      statusCode: 400,
    };
  } else {
    const appointment = new AppointmentsModel({
      date,
      doctor,
      pet,
      observations,
    });
    try {
      const createdAppointment = await appointment.save();
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

module.exports = {
  getAllAppointmentsService,
  createAppointmentService,
};
