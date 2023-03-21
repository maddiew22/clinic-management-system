const doctorData = require("../models/doctor")

const fetchDoctors = async(req,res) => {
    const doctors = await doctorData.find();
    res.json({doctors})
}

const fetchDoctor = async(req,res) => {
    const doctorId = req.params.id
    const doctor = await doctorData.findById(doctorId);
    res.json({doctor})
}

const createDoctor = async(req,res) => {
    const doctor = req.body;
    const newDoctor = new doctorData(doctor);
    try {
        await newDoctor.save();
        res.json({newDoctor});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateDoctor =async(req,res) => {
    const doctorId = req.params.id;
    const doctor = req.body;
    const updatedDoctor = await doctorData.findByIdAndUpdate(doctorId, {
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        specialty: doctor.age,
    }); 
    res.json({doctor});
}

const deleteDoctor = async(req,res) => {
    doctorId = req.params.id;
    await doctorData.findByIdAndDelete(doctorId);
    res.json({success: "Patient deleted"});
}

module.exports = {
    fetchDoctors,
    fetchDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor,
}