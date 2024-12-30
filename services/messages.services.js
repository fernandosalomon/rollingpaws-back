const { contactTemplateMail, PlansTemplateMail } = require("../helpers/mails.template")
const MessagesModel = require("../models/messages.model")

const getAllMessagesService = async () => {
    try {
        const messages = await MessagesModel.find();
        return {
            data: messages,
            statusCode: 200,
        };
    } catch (error) {
        console.log(error);
        return {
            data: `No pudimos conectar con la base de datos.`,
            statusCode: 500,
        };
    }
}

const postNewMessageService = async (messageData) => {
    try {
        const newMessage = new MessagesModel(messageData)
        const postedMessage = await newMessage.save()

        if (postedMessage) {
            if (messageData.type === "Contact") {
                contactTemplateMail(messageData.contactName, messageData.contactEmail);
            }
            if (messageData.type === "Plans") {
                PlansTemplateMail(messageData.contactName, messageData.contactEmail);
            }
            return {
                message: "El mensaje fue guardado con exito.",
                statusCode: 201,
            }
        } else {
            return {
                message: "Ocurrio un error tratando de guardar su mensaje.",
                statusCode: 500,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            message: "Ocurrio un error tratando de guardar su mensaje.",
            statusCode: 500,
        };
    }
}

const setReadedMessageService = async (messageID) => {
    try {
        const setReaded = await MessagesModel.findByIdAndUpdate(messageID, { read: true });
        if (setReaded) {
            return {
                data: "El mensaje fue marcado como leido",
                statusCode: 200
            }
        } else {
            return {
                data: "Hubo un error al tratar de marcar el mensaje como leido",
                statusCode: 500
            }
        }
    } catch (error) {
        console.log(error);
        return {
            message: "Ocurrio un error tratando de guardar su mensaje.",
            statusCode: 500,
        };
    }
}

module.exports = { getAllMessagesService, postNewMessageService, setReadedMessageService }