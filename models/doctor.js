const mongoose = require("mongoose")

const doctorSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    specialty: String,
});

const doctor = mongoose.model('doctor', doctorSchema);
module.exports = doctor;