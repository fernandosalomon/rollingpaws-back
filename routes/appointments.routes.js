const { Router } = require("express");
const {
  getAllAppointmentsController,
  createAppointmentController,
} = require("../controllers/appointments.controllers");

const router = Router();

router.get("/", getAllAppointmentsController);

router.post("/", createAppointmentController);

module.exports = router;
