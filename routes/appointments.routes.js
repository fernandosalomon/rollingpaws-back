const { Router } = require("express");
const {
  getAllAppointmentsController,
  getAppointmentsByIdController,
  getUserAppointmentsController,
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController,
} = require("../controllers/appointments.controllers");

const router = Router();

router.get("/user", getUserAppointmentsController);
router.get("/", getAllAppointmentsController);
router.get("/:appointmentID", getAppointmentsByIdController);

router.post("/", createAppointmentController);

router.put("/:appointmentID", updateAppointmentController);

router.delete("/:appointmentID", deleteAppointmentController);

module.exports = router;
