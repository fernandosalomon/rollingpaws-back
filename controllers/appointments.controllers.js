const AppointmentsModel = require("../models/appointments.model");
const {
  getAllAppointmentsService,
  createAppointmentService,
} = require("../services/appointments.services");

const getAllAppointmentsController = async (req, res) => {
  try {
    const appointments = await getAllAppointmentsService();
    appointments.statusCode === 200
      ? res.status(appointments.statusCode).json(appointments.data)
      : res.status(appointments.statusCode).json(appointments.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createAppointmentController = async (req, res) => {
  try {
    const createdAppointment = await createAppointmentService(req.body);
    createdPet.statusCode === 201
      ? res.status(createdAppointment.statusCode).json(createdAppointment.data)
      : res
          .status(createdAppointment.statusCode)
          .json(createdAppointment.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllAppointmentsController,
  createAppointmentController,
};
