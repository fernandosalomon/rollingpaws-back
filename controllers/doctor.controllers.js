const DoctorModel = require("../models/doctor.model");
const {
  getAllDoctorsService,
  createDoctorService,
  updateDoctorService,
  deleteDoctorService,
  getDoctorByIdService,
  getDoctorFreeHoursService,
} = require("../services/doctor.services");

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await getAllDoctorsService();
    doctors.statusCode === 200
      ? res.status(doctors.statusCode).json(doctors.data)
      : res.status(doctors.statusCode).json(doctors.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getDoctorByIdController = async (req, res) => {
  const doctorID = req.params.doctorID;
  try {
    const doctor = await getDoctorByIdService(doctorID);
    doctor.statusCode === 200
      ? res.status(doctor.statusCode).json(doctor.data)
      : res.status(doctor.statusCode).json(doctor.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getDoctorFreeHoursController = async (req, res) => {
  const doctorID = req.params.doctorID;
  const pickedDate = req.params.pickedDate;
  try {
    const doctorFreeHours = await getDoctorFreeHoursService(
      doctorID,
      pickedDate
    );
    doctorFreeHours.statusCode === 200
      ? res.status(doctorFreeHours.statusCode).json(doctorFreeHours.data)
      : res.status(doctorFreeHours.statusCode).json(doctorFreeHours.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createDoctorController = async (req, res) => {
  try {
    const createdDoctor = await createDoctorService(req.body);
    createdDoctor.statusCode === 201
      ? res.status(createdDoctor.statusCode).json(createdDoctor.data)
      : res.status(createdDoctor.statusCode).json(createdDoctor.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateDoctorController = async (req, res) => {
  try {
    const updatedDoctor = await updateDoctorService(
      req.params.doctorID,
      req.body
    );
    updatedDoctor.statusCode === 200
      ? res.status(updatedDoctor.statusCode).json(updatedDoctor.data)
      : res.status(updatedDoctor.statusCode).json(updatedDoctor.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteDoctorController = async (req, res) => {
  try {
    const deletedDoctor = await deleteDoctorService(req.params.doctorID);
    deletedDoctor.statusCode === 200
      ? res.status(deletedDoctor.statusCode).json(deletedDoctor.data)
      : res.status(deletedDoctor.statusCode).json(deletedDoctor.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllDoctorsController,
  getDoctorByIdController,
  getDoctorFreeHoursController,
  createDoctorController,
  updateDoctorController,
  deleteDoctorController,
};
