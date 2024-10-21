const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
        "Formato de nombre incorrecto.",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
        "Formato de email inválido.",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: [
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
        "Formato de número de teléfono invalido",
      ],
    },
    adress: {
      type: String,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ'0-9\s]+$/,
        "Formato de dirección incorrecto",
      ],
      minLength: 2,
      maxLength: 40,
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);
module.exports = UserModel;
