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
  getUserSelfDataController,
} = require("../controllers/user.controllers");

const router = Router();

router.get("/", getAllUsersController);
router.get("/self", getUserSelfDataController);
router.get("/:userID", getUserByIdController);

router.post("/", loginUserController);

router.post("/register", createNewUserController);

router.put("/logout", logoutUserController);
router.put("/ban-user/:userID", banUserController);
router.put("/:userID", updateUserController);

router.delete("/:userID", deleteUserByIdController);

module.exports = router;
