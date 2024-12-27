const { Router } = require("express");
const {
  getAllUsersController,
  getUserByIdController,
  createNewUserController,
  updateUserController,
  deleteUserByIdController,
  loginUserController,
  logoutUserController,
  banUserController,
  getUserSelfDataController,
  updateUserPicController,
  changePasswordController,
  changePasswordWithTokenController,
  forgotPasswordController,
} = require("../controllers/user.controllers");
const multer = require("../middlewares/multer")

const router = Router();

router.get("/self", getUserSelfDataController);
router.get("/:userID", getUserByIdController);
router.get("/", getAllUsersController);

router.post("/", loginUserController);

router.post("/register", createNewUserController);
router.post("/profile-pic/:userID", multer.single("profilePic"), updateUserPicController)

router.put("/change-password-token", changePasswordWithTokenController)
router.put("/change-password", changePasswordController)
router.put("/forgot-password", forgotPasswordController)
router.put("/logout", logoutUserController);
router.put("/ban-user/:userID", banUserController);
router.put("/:userID", updateUserController);

router.delete("/:userID", deleteUserByIdController);

module.exports = router;
