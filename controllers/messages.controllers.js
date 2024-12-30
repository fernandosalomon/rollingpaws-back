const MessagesModel = require("../models/messages.model");
const { getAllMessagesService, postNewMessageService, setReadedMessageService } = require("../services/messages.services");


const getAllMessagesController = async (req, res) => {
    try {
        const messages = await getAllMessagesService();
        res.status(messages.statusCode).json(messages.data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const postNewMessageController = async (req, res) => {
    try {
        const postMessage = await postNewMessageService(req.body);
        res.status(postMessage.statusCode).json(postMessage.message);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const setReadedMessageController = async (req, res) => {
    try {
        const setReadedMessage = await setReadedMessageService(req.params.messageID);
        res.status(setReadedMessage.statusCode).json(setReadedMessage.message);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { getAllMessagesController, postNewMessageController, setReadedMessageController };