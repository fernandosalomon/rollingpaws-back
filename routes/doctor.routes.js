const { Router } = require("express");
const {
  getAllDoctorsController,
  getDoctorByIdController,
  createDoctorController,
  updateDoctorController,
  deleteDoctorController,
  getDoctorFreeHoursController,
} = require("../controllers/doctor.controllers");

const router = Router();

router.get("/", getAllDoctorsController);
router.get("/:doctorID", getDoctorByIdController);
router.get(
  "/clinic-hours/:doctorID&:selectedDate",
  getDoctorFreeHoursController
);

router.post("/", createDoctorController);

router.put("/:doctorID", updateDoctorController);

router.delete("/:doctorID", deleteDoctorController);

module.exports = router;
