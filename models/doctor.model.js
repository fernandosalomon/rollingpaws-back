const { model, Schema } = require("mongoose");
const AppointmentsModel = require("./appointments.model");

const doctorSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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
      type: Number,
      required: true,
      enum: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ],
    },

    endWorkingHour: {
      type: Number,
      required: true,
      enum: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
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
