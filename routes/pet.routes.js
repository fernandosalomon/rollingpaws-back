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
const multer = require("../middlewares/multer")

const router = Router();

router.get("/user", getAllPetsFromUserController);
router.get("/:petID", getPetByIdController);
router.get("/", getAllPetsController);

router.post("/", createNewPetController);
router.post("/image/:petID", multer.single("image"), updatePetPicController)

router.put("/:petID", updatePetController);

router.delete("/:petID", deletePetByIdController);

module.exports = router;
