const mongoose = require("mongoose");

const prescriptionSchema = mongoose.Schema({
    medicineName: String,
    prescriptionLength: String,
    date: String,
});
const prescription = mongoose.model('prescription', prescriptionSchema);

module.exports = prescription;