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
    specie: {
      type: String,
      required: true,
      enum: [0, 1, 2, 3, 4, 5, 6],
    },
    breed: {
      type: String,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
        "Formato de raza incorrecto.",
      ],
    },
    sex: {
      type: String,
      enum: [0, 1],
    },
    size: {
      type: String,
      enum: [1, 2, 3, 4, 5],
    },
    age: {
      type: String,
      enum: [1, 2, 3, 4],
    },
    health: {
      type: String,
      enum: [1, 2, 3, 4],
    },
    observations: {
      type: String,
      maxLength: 200,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ'0-9\s/$\-_.,()]+$/,
        "El texto no tiene el formáto correcto (Solo letras, numeros y caracteres especiales: /$-_,.())",
      ],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/dqpq2d0es/image/upload/v1734985899/default-pet-image_abs6xm.png"
    }
  },
  { timestamps: true }
);

const PetModel = model("Pet", petSchema);
module.exports = PetModel;
