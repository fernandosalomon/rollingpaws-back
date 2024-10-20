const { Router } = require("express");
const {
  getAllUsersController,
  createNewUserController,
  getUserByIdController,
  updateUserController,
  deleteUserByIdController,
} = require("../controllers/user.controllers");

const router = Router();

router.get("/", getAllUsersController);
router.get("/:userID", getUserByIdController);

router.post("/register", createNewUserController);

router.put("/:userID", updateUserController);

router.delete("/:userID", deleteUserByIdController);

module.exports = router;
