const { Router } = require("express");
const { getAllUsersController } = require("../controllers/user.controllers");

const router = Router();

router.get("/", getAllUsersController);

module.exports = router;
