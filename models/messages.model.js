const { model, Schema } = require("mongoose");

const messagesSchema = new Schema({
    type: {
        type: String,
        enum: ["contact", "plans"],
    },
    contactName: {
        type: String,
        required: true,
        match: [
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
            "Formato de nombre incorrecto.",
        ],
    },
    contactEmail: {
        type: String,
        required: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
            "Formato de email inválido.",
        ],
    },
    contactPhone: {
        type: String,
        match: [
            /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
            "Formato de número de teléfono invalido",
        ],
    },
    contactMessage: {
        type: String,
        maxLength: 200,
        match: [
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ'0-9\s/$\-_.,()]+$/,
            "El texto no tiene el formáto correcto (Solo letras, numeros y caracteres especiales: /$-_,.())",
        ],
    },
    selectedPlan: {
        type: String,
        enum: [0, 1, 2]
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true })

const MessagesModel = model("Messages", messagesSchema);
module.exports = MessagesModel;