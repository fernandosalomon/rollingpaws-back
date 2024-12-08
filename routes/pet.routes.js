const { Router } = require("express");
const {
  getAllPetsController,
  getPetByIdController,
  createNewPetController,
  updatePetController,
  deletePetByIdController,
  getAllPetsFromUserController,
} = require("../controllers/pet.controllers");

const router = Router();

router.get("/user/:userID", getAllPetsFromUserController);
router.get("/user", getAllPetsFromUserController);
router.get("/:petID", getPetByIdController);
router.get("/", getAllPetsController);

router.post("/", createNewPetController);

router.put("/:petID", updatePetController);

router.delete("/:petID", deletePetByIdController);

module.exports = router;
