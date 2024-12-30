const { Router } = require("express");
const {
  getAllPetsController,
  getPetByIdController,
  createNewPetController,
  updatePetController,
  deletePetByIdController,
  getAllPetsFromUserController,
  updatePetPicController,
} = require("../controllers/pet.controllers");
const multer = require("../middlewares/multer");
const auth = require("../middlewares/auth");

const router = Router();

router.get("/user", auth("user"), getAllPetsFromUserController);
router.get("/:petID", auth("admin"), getPetByIdController);
router.get("/", auth("admin"), getAllPetsController);

router.post("/", auth("user"), createNewPetController);
router.post("/image/:petID", auth("user"), multer.single("image"), updatePetPicController)

router.put("/:petID", auth("user"), updatePetController);

router.delete("/:petID", auth("user"), deletePetByIdController);

module.exports = router;
