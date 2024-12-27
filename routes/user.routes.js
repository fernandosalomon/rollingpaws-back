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
const multer = require("../middlewares/multer");
const auth = require("../middlewares/auth");

const router = Router();

router.get("/self", auth("user"), getUserSelfDataController);
router.get("/:userID", auth("admin"), getUserByIdController);
router.get("/", auth("admin"), getAllUsersController);

router.post("/", loginUserController);

router.post("/register", createNewUserController);
router.post("/profile-pic/:userID", auth("user"), multer.single("profilePic"), updateUserPicController)

router.put("/change-password-token", changePasswordWithTokenController)
router.put("/change-password", auth("user"), changePasswordController)
router.put("/forgot-password", forgotPasswordController)
router.put("/logout", auth("user"), logoutUserController);
router.put("/ban-user/:userID", auth("admin"), banUserController);
router.put("/:userID", auth("user"), updateUserController);

router.delete("/:userID", auth("admin"), deleteUserByIdController);

module.exports = router;
