const MessagesModel = require("../models/messages.model")

const postNewMessageService = async (messageData) => {
    try {
        const newMessage = new MessagesModel(messageData)
        const postedMessage = await newMessage.save()

        return {
            message: "El mensaje fue guardado con exito.",
            statusCode: 201,
        }

    } catch (error) {
        console.log(error);
        return {
            message: "Ocurrio un error tratando de guardar su mensaje.",
            statusCode: 500,
        };
    }
}

module.exports = { postNewMessageService }