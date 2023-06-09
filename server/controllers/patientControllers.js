const patientData = require("../models/patient")
const prescriptionData = require("../models/prescriptions")
const appointmentData = require("../models/appointments")
const doctorData = require("../models/doctor")

// Get list of all patients
const fetchPatients = async(req,res) => {
    const patients = await patientData.find().sort({"lastName":1});
    res.json({patients})
}

// Search for patients by last name
const applyPatientSearch = async(req,res) => {
    const filter = req.params.filter;
    const patients = await patientData.find({
        lastName: {$regex: filter}}) 
    res.json({patients})
}

// Get a patient's information based on a specified ID
const fetchPatient = async(req,res) => {
    const patientId = req.params.id
    const patient = await patientData.findById(patientId);
    res.json({patient})
}

// Add new patient
const createPatient = async(req,res) => {
    const patient = req.body;
    const newPatient = new patientData(patient);
    try {
        await newPatient.save();
        res.json({newPatient});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// Update patient's information
const updatePatient =async(req,res) => {
    const patientId = req.params.id;
    const patient = req.body;
    const updatedPatient = await patientData.findByIdAndUpdate(patientId, {
        firstName: patient.firstName,
        lastName: patient.lastName,
        age: patient.age,
        conditions: patient.conditions,
        email: patient.email,
        phoneNumber: patient.phoneNumber,
        address: patient.address
    }); 
    res.json({patient});
}

// Add a new prescription for a specified patient
const addPrescription = async(req,res) => {
    const patientId = req.params.id;
    const prescription = req.body;
    const newPrescription = new prescriptionData({
            medicineName: prescription.medicineName,
            prescriptionLength: prescription.prescriptionLength,
            date: prescription.date,
        })
    await newPrescription.save();
    const addedPrescription = await patientData.findByIdAndUpdate(patientId, {
        $push: {prescriptions: newPrescription}
    }).populate("prescriptions")
    res.json({addedPrescription});
}

// Get list of prescriptions for a specified patient
const getPrescriptions = async(req, res) => {
    const patientId = req.params.id;
    const patient = await patientData.findById(patientId).populate("prescriptions");
    res.json({patient})
}

// Delete patient
const deletePatient = async(req,res) => {
    patientId = req.params.id;
    await patientData.findByIdAndDelete(patientId);
    res.json({success: "Patient deleted"});
}

// Get list of all upcoming appointments for specified patient
const fetchPatientAppointments = async(req,res) => {
    id = req.params.id;
    try {
        const doctor = await patientData.findById(id);
        const appointments  = await appointmentData.find({
            patientId: id,
            date: {$gte: new Date()}
        }).sort({"date":1, "time":1})
        res.json({appointments})
    } catch (err) {
        console.log(err)
    }
}

// Get all appointments (past and upcoming) for a specified patient
const showAllPatientAppointments = async(req,res) => {
    const id = req.params.id;
    const filter = req.params.filter;
    if (filter === "all")
    {
        const appointments = await appointmentData.find({
            patientId: id
        }).sort({"date":1, "time":1})
        res.json({appointments})
    }

}

// Create an appointment for the specified patient
const createPatientAppointment = async(req,res) => {
    id = req.params.id;
    const selectedPatient = await patientData.findById(id)
    const appointment = req.body;
    const newAppointment = new appointmentData({
        patientName: selectedPatient.firstName + " " + selectedPatient.lastName,
        patientId: id,
        doctorName: appointment.doctorName,
        doctorId: appointment.doctorId,
        reasonForAppointment: appointment.reasonForAppointment,
        date: appointment.date,
        time: appointment.time,
        notes: appointment.notes,
    });

    try {
        await doctorData.findOne({
        _id:newAppointment.doctorId 
    })
    } catch (err) {
        res.status(500).json({message: "Could not find doctor with that ID"});
        return;
    }   

    const today = new Date();
    if(
        newAppointment.date < today
    ) {
        res.status(500).json({message: "Please choose a future date"})
    }
    else if (await appointmentData.findOne({
        doctorId: newAppointment.doctorId,
        date: newAppointment.date,
        time: newAppointment.time,
    })) {
        res.status(500).json({message: "Time slot is already booked"});
    }
    else {
        try {
            await newAppointment.save();
            res.json({newAppointment});
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    }   
}

module.exports = {
    fetchPatients,
    fetchPatient,
    createPatient,
    updatePatient,
    deletePatient,
    applyPatientSearch,
    addPrescription,
    getPrescriptions,
    fetchPatientAppointments,
    createPatientAppointment,
    showAllPatientAppointments,
}