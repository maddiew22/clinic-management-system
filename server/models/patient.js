const prescriptionSchema = require("./prescriptions")
const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    conditions: [String],
    email: String,
    phoneNumber: String,
    address: String,
    prescriptions: [{type:mongoose.Schema.Types.ObjectId, ref:"prescription"}]
});
const patient = mongoose.model('patient', patientSchema);

module.exports = patient;





