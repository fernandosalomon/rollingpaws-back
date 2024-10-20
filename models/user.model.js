const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    match: [
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
      "Formato de nombre incorrecto.",
    ],
  },
});

const UserModel = model("User", userSchema);
module.exports = UserModel;
