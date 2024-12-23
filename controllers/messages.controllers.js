const MessagesModel = require("../models/messages.model");
const { postNewMessageService } = require("../services/messages.services");

const postNewMessageController = async (req, res) => {
    try {
        const postMessage = await postNewMessageService(req.body);
        res.status(postMessage.statusCode).json(postMessage.message);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { postNewMessageController };