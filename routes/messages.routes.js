const { Router } = require("express");
const { postNewMessageController } = require("../controllers/messages.controllers");
const router = Router();

router.post("/", postNewMessageController);

module.exports = router;