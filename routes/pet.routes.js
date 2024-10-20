const { Router } = require("express");
const {
  getAllPetsController,
  getPetByIdController,
  createNewPetController,
  updatePetController,
  deletePetByIdController,
} = require("../controllers/pet.controllers");

const router = Router();

router.get("/", getAllPetsController);
router.get("/:petID", getPetByIdController);

router.post("/", createNewPetController);

router.put("/:petID", updatePetController);

router.delete("/:petID", deletePetByIdController);

module.exports = router;
