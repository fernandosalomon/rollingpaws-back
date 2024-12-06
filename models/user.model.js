const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
        "Formato de nombre incorrecto.",
      ],
    },
    lastName: {
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
      default: "",
    },
    address: {
      type: String,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ'0-9\s]+$/,
        "Formato de dirección incorrecto",
      ],
      minLength: 2,
      maxLength: 40,
      default: "",
    },
    city: {
      type: String,
      match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ'\s]+$/, "Formato de ciudad incorrecto"],
      minLength: 2,
      maxLength: 40,
      default: "",
    },
    province: {
      type: String,
      match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ'\s]+$/, "Formato de provincia incorrecto"],
      minLength: 2,
      maxLength: 40,
      default: "",
    },
    zipCode: {
      type: String,
      match: [/^\d{4}$/, "Formato de código postal incorrecto"],
      minLength: 2,
      maxLength: 40,
      default: "",
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    banned: {
      type: Boolean,
      default: 0,
      required: true,
    },
    logged: {
      type: Boolean,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const { password, createdAt, updatedAt, __v, logged, ...userData } =
    this.toObject();
  return userData;
};

const UserModel = model("User", userSchema);
module.exports = UserModel;
