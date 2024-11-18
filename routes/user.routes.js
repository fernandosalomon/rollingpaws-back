const { Router } = require("express");
const {
  getAllUsersController,
  createNewUserController,
  getUserByIdController,
  updateUserController,
  deleteUserByIdController,
  loginUserController,
  logoutUserController,
  banUserController,
} = require("../controllers/user.controllers");

const router = Router();

router.get("/", getAllUsersController);
router.get("/:userID", getUserByIdController);

router.post("/", loginUserController);
router.post("/logout", logoutUserController);
router.post("/register", createNewUserController);

router.put("/:userID", updateUserController);
router.put("/ban-user/:userID", banUserController);

router.delete("/:userID", deleteUserByIdController);

module.exports = router;
