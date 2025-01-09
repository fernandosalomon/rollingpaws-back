const { model, Schema } = require("mongoose");

const appointmentsSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          const dateToValidate = new Date(value);
          return (dateToValidate.getUTCDate() >= today.getUTCDate() && dateToValidate.getUTCMonth() >= today.getUTCMonth() && dateToValidate.getUTCFullYear() >= today.getUTCFullYear());
        },
        message: "La fecha de la cita no puede ser anterior a la fecha actual.",
      },
    },
    startTime: {
      type: String,
      required: true,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "La hora debe corresponder con el formato HH:mm, donde HH es un número entre 0 y 23 y mm un número entre 0 y 59"],
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          const dateToValidate = new Date(value);
          return (dateToValidate.getUTCDate() >= today.getUTCDate() && dateToValidate.getUTCMonth() >= today.getUTCMonth() && dateToValidate.getUTCFullYear() >= today.getUTCFullYear());
        },
        message: "La fecha de la cita no puede ser anterior a la fecha actual.",
      },
    },
    endTime: {
      type: String,
      required: true,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "La hora debe corresponder con el formato HH:mm, donde HH es un número entre 0 y 23 y mm un número entre 0 y 59"],
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    observations: {
      type: String,
      max: {
        value: 200,
        message: "Máximo permitido: 200 caracteres",
      },
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ'0-9\s/$\-_.,()]+$/,
        "El texto no tiene el formáto correcto (Solo letras, numeros y caracteres especiales: /$-_,.())",
      ],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

const AppointmentsModel = model("Appointments", appointmentsSchema);
module.exports = AppointmentsModel;
