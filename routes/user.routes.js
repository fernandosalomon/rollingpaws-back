const { Router } = require("express");
const {
  getAllUsersController,
  createNewUserController,
} = require("../controllers/user.controllers");

const router = Router();

router.get("/", getAllUsersController);

router.post("/register", createNewUserController);

module.exports = router;
