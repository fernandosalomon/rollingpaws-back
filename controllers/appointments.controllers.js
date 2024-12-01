const AppointmentsModel = require("../models/appointments.model");
const {
  getAllAppointmentsService,
  createAppointmentService,
  getAppointmentsByIdService,
  updateAppointmentService,
  deleteAppointmentService,
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

const getAppointmentsByIdController = async (req, res) => {
  const appointmentID = req.params.appointmentID;
  try {
    const appointments = await getAppointmentsByIdService(appointmentID);
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
    createdAppointment.statusCode === 201
      ? res.status(createdAppointment.statusCode).json(createdAppointment.data)
      : res
          .status(createdAppointment.statusCode)
          .json(createdAppointment.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateAppointmentController = async (req, res) => {
  try {
    const updatedAppointment = await updateAppointmentService(
      req.params.appointmentID,
      req.body
    );
    updatedAppointment.statusCode === 200
      ? res.status(updatedAppointment.statusCode).json(updatedAppointment.data)
      : res
          .status(updatedAppointment.statusCode)
          .json(updatedAppointment.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteAppointmentController = async (req, res) => {
  try {
    const deletedAppointment = await deleteAppointmentService(
      req.params.appointmentID
    );
    deletedAppointment.statusCode === 200
      ? res.status(deletedAppointment.statusCode).json(deletedAppointment.data)
      : res
          .status(deletedAppointment.statusCode)
          .json(deletedAppointment.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllAppointmentsController,
  getAppointmentsByIdController,
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController,
};
