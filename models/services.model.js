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
        default: "https://res.cloudinary.com/dqpq2d0es/image/upload/v1734977722/user-default-pic_y72gar.png"
    },
    duration: {
        type: String,
        require: true,
        match: [
            /^([01]\d|2[0-3]):[0-5]\d$/,
            "El formato de tiempo es HH:mm donde HH es un número entre 00 y 23 y mm es un número entre 00 y 59",
        ],
    }
})

const ServiceModel = model("Service", ServiceSchema);
module.exports = ServiceModel;