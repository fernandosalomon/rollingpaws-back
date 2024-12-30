const { model, Schema } = require("mongoose");
const AppointmentsModel = require("./appointments.model");

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
        "Formato de nombre incorrecto.",
      ],
      required: true,
    },
    workingDays: {
      type: [
        {
          type: String,
          enum: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
        },
      ],
    },
    startWorkingHour: {
      type: String,
      required: true,
      match: [
        /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "El texto no tiene el formáto correcto (Solo letras, numeros y caracteres especiales: /$-_,.())",
      ],
    },

    endWorkingHour: {
      type: String,
      required: true,
      match: [
        /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "El texto no tiene el formáto correcto (Solo letras, numeros y caracteres especiales: /$-_,.())",
      ],
    },
    description: {
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
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointments",
      },
    ],
  },
  { timestamps: true }
);

const DoctorModel = model("Doctor", doctorSchema);
module.exports = DoctorModel;
