const { Router } = require("express");
const {
  getAllAppointmentsController,
  getAppointmentsByIdController,
  getUserAppointmentsController,
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController,
} = require("../controllers/appointments.controllers");
const auth = require("../middlewares/auth");

const router = Router();

router.get("/user", auth("user"), getUserAppointmentsController);
router.get("/", auth("admin"), getAllAppointmentsController);
router.get("/:appointmentID", auth("admin"), getAppointmentsByIdController);

router.post("/", auth("user"), createAppointmentController);

router.put("/:appointmentID", auth("user"), updateAppointmentController);

router.delete("/:appointmentID", auth("user"), deleteAppointmentController);

module.exports = router;
