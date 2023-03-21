const patientData = require("../models/patient")

const fetchPatients = async(req,res) => {
    const patients = await patientData.find();
    res.json({patients})
}

const applySearch = async(req,res) => {
    const filter = req.params.filter;
    const patients = await patientData.find({firstName:filter});
    res.json({patients})
}

const fetchPatient = async(req,res) => {
    const patientId = req.params.id
    const patient = await patientData.findById(patientId);
    res.json({patient})
}

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

const deletePatient = async(req,res) => {
    patientId = req.params.id;
    await patientData.findByIdAndDelete(patientId);
    res.json({success: "Patient deleted"});
}

module.exports = {
    fetchPatients,
    fetchPatient,
    createPatient,
    updatePatient,
    deletePatient,
    applySearch,
}