const { Router } = require("express");
const {
  getAllDoctorsController,
  getDoctorByIdController,
  createDoctorController,
  updateDoctorController,
  deleteDoctorController,
  getDoctorFreeHoursController,
} = require("../controllers/doctor.controllers");
const auth = require("../middlewares/auth");

const router = Router();

router.get("/", auth("user"), getAllDoctorsController);
router.get("/:doctorID", auth("user"), getDoctorByIdController);
router.get(
  "/clinic-hours/:doctorID&:selectedDate", auth("user"),
  getDoctorFreeHoursController
);

router.post("/", auth("admin"), createDoctorController);

router.put("/:doctorID", auth("admin"), updateDoctorController);

router.delete("/:doctorID", auth("admin"), deleteDoctorController);

module.exports = router;
