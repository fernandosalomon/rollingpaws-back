const { Router } = require("express");
const { postNewMessageController, getAllMessagesController, setReadedMessageController } = require("../controllers/messages.controllers");
const router = Router();

router.get("/", getAllMessagesController);

router.post("/", postNewMessageController);

router.put("/:messageID", setReadedMessageController)

module.exports = router;