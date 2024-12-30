const AppointmentsModel = require("../models/appointments.model");
const jwt = require("jsonwebtoken");
const {
  getAllAppointmentsService,
  createAppointmentService,
  getAppointmentsByIdService,
  updateAppointmentService,
  deleteAppointmentService,
  getUserAppointmentsService,
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

const getUserAppointmentsController = async (req, res) => {
  const token = req.headers.authtoken;
  const userID = jwt.verify(token, process.env.JWT_SECRET).id;

  try {
    const appointments = await getUserAppointmentsService(userID);
    appointments.statusCode === 200
      ? res.status(appointments.statusCode).json(appointments.data)
      : res.status(appointments.statusCode).json(appointments.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createAppointmentController = async (req, res) => {

  const token = req.headers.authtoken;
  const userID = jwt.verify(token, process.env.JWT_SECRET).id;

  try {
    const createdAppointment = await createAppointmentService(req.body, userID);
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
  getUserAppointmentsController,
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController,
};
