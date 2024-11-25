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
      unique: true,
    },
    species: {
      type: String,
      maxLength: 50,
      required: true,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
        "Formato de especie incorrecto.",
      ],
    },
    sex: {
      type: String,
      enum: [0, 1],
    },
    size: {
      type: String,
      enum: [0, 1, 2, 3, 4],
    },
    age: {
      type: String,
      enum: [0, 1, 2, 3],
    },
    health: {
      type: String,
      enum: [0, 1, 2, 3],
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
  },
  { timestamps: true }
);

const PetModel = model("Pet", petSchema);
module.exports = PetModel;
