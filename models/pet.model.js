const { model, Schema } = require("mongoose");

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
        "Formato de nombre incorrecto.",
      ],
    },
    species: {
      type: String,
      maxLength: 20,
      required: true,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
        "Formato de nombre incorrecto.",
      ],
    },
    breed: {
      type: String,
      maxLength: 20,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
        "Formato de nombre incorrecto.",
      ],
    },
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    color: {
      type: String,
      maxLength: 20,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
        "Formato de nombre incorrecto.",
      ],
    },
    weight: {
      type: Number,
      min: [0.1],
      max: [1000],
    },
    height: {
      type: Number,
      min: [1],
      max: [550],
    },
    observations: {
      type: String,
      maxLength: 200,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ'0-9\s/$\-_.,()]+$/,
        "El texto no tiene el formáto correcto (Solo letras, numeros y caracteres especiales: /$-_,.())",
      ],
    },
  },
  { timestamps: true }
);

const PetModel = model("Pet", petSchema);
module.exports = PetModel;
