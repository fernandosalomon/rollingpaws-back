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
          return today < dateToValidate;
        },
        message: "La fecha de la cita no puede ser anterior a la fecha actual.",
      },
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          const dateToValidate = new Date(value);
          return today < dateToValidate;
        },
        message: "La fecha de la cita no puede ser anterior a la fecha actual.",
      },
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
