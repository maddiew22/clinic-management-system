const appointmentsData = require("../models/appointments")

const fetchPatientAppointments = async(req,res) => {
    const doctors = await doctorData.find();
    res.json({doctors})
}

const fetchDoctorAppointments = async(req,res) => {
    const doctorId = req.params.id
    const doctor = await doctorData.findById(doctorId);
    res.json({doctor})
}

module.exports = {
    fetchPatientAppointments,
    fetchDoctorAppointments,
}