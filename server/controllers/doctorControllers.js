const doctorData = require("../models/doctor")
const appointmentData = require("../models/appointments")
const patientData = require("../models/patient")

const fetchDoctors = async(req,res) => {
    const doctors = await doctorData.find().sort({"lastName":1});
    res.json({doctors})
}

const applyDoctorSearch = async(req,res) => {
    const filter = req.params.filter;
    const doctors = await doctorData.find({
        lastName: {$regex: filter}}) 
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
    res.json({success: "Doctor deleted"});
}

const fetchDoctorAppointments = async(req,res) => {
    id = req.params.id;
    try {
        const doctor = await doctorData.findById(id);
        const appointments  = await appointmentData.find({
            doctorId: id,
            date: {$gte: new Date()}
        }).sort({"date":1, "time":1})
        res.json({appointments})
    } catch (err) {
        console.log(err)
    }
}

const showAllDoctorAppointments = async(req,res) => {
    const id = req.params.id;
    const filter = req.params.filter;
    if (filter === "all")
    {
        const appointments = await appointmentData.find({
            doctorId: id
        }).sort({"date":1, "time":1})
        res.json({appointments})
    }

}

const createDoctorAppointment = async(req,res) => {
    id = req.params.id;
    const selectedDoctor = await doctorData.findById(id)
    const appointment = req.body;
    const newAppointment = new appointmentData({
        patientName: appointment.patientName,
        patientId: appointment.patientId,
        doctorName: selectedDoctor.firstName + " " + selectedDoctor.lastName,
        doctorId: id,
        reasonForAppointment: appointment.reasonForAppointment,
        date: appointment.date,
        time: appointment.time,
        notes: appointment.notes,
    });

    try {
        await patientData.findOne({
        _id:newAppointment.patientId 
    })
    } catch (err) {
        res.status(500).json({message: "Could not find patient with that ID"});
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
    fetchDoctors,
    fetchDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    applyDoctorSearch,
    fetchDoctorAppointments,
    createDoctorAppointment,
    showAllDoctorAppointments,
}