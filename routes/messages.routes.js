const { Router } = require("express");
const { postNewMessageController, getAllMessagesController, setReadedMessageController } = require("../controllers/messages.controllers");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/", auth("admin"), getAllMessagesController);

router.post("/", postNewMessageController);

router.put("/:messageID", auth("admin"), setReadedMessageController)

module.exports = router;