const mongoose = require("mongoose")

const appointmentSchema = mongoose.Schema({
    patientName: {
        type: String,
        required: true,
      },
    patientId: {
        type: String,
        required: true,
      },
      doctorName: {
        type: String,
        required: true,
      },
      doctorId: {
        type: String,
        required: true,
      },
      reasonForAppointment: {
        type: Object,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
      },
    },
    {
      timestamps: true,
});

const appointments = mongoose.model('appointments', appointmentSchema);
module.exports = appointments;