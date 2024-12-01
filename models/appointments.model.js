const { model, Schema } = require("mongoose");

const appointmentsSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    observations: {
      type: String,
    },
  },
  { timestamps: true }
);

const AppointmentsModel = model("Appointments", appointmentsSchema);
module.exports = AppointmentsModel;
