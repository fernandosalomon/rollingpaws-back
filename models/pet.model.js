const { model, Schema } = require("mongoose");

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    match: [
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
      "Formato de nombre incorrecto.",
    ],
  },
});

const PetModel = model("Pet", petSchema);
module.exports = PetModel;
