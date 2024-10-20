const { Router } = require("express");
const { getAllPetsController } = require("../controllers/pet.controllers");

const router = Router();

router.get("/", getAllPetsController);

module.exports = router;
