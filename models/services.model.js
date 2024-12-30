const { model, Schema } = require("mongoose");

const ServiceSchema = new Schema({

    name: {
        type: String,
        required: true,
        match: [
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
            "Formato de nombre incorrecto.",
        ],
    },
    description: {
        type: String,
        required: true,
        match: [
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ'0-9\s/$\-_.,()]+$/,
            "El texto no tiene el formáto correcto (Solo letras, numeros y caracteres especiales: /$-_,.())",
        ],
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dqpq2d0es/image/upload/v1735494046/clinica_u07eeu.jpg"
    },
})

const ServiceModel = model("Service", ServiceSchema);
module.exports = ServiceModel;