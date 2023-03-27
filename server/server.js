//Import dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { fetchPatients, fetchPatient, createPatient, updatePatient, deletePatient, applySearch, addPrescription, getPrescriptions, fetchPatientAppointments, createPatientAppointment, deletePatientAppointment } = require("./controllers/patientControllers");
const { fetchDoctors, fetchDoctor, createDoctor, updateDoctor, deleteDoctor, fetchDoctorAppointments, createDoctorAppointment } = require("./controllers/doctorControllers");
const { signup, login, logout, checkAuth } = require ("./controllers/userControllers");
const requireAuth = require("./middleware/requireAuth");

if (process.env.NODE_ENV != "production") {
   require("dotenv").config() 
}

//Create and configure express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: true,
   credentials: true,
}));
app.use(bodyParser.json({limit: "20mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "20mb", extended: true}));


//Connect to databse
connectToDb();

//Routing

// app.post('/signup', signup);
app.post('/login', login);
app.get('/logout', logout);

app.get('/check-auth', requireAuth, checkAuth);

app.get('/patients', fetchPatients);
app.get('/patients/:filter', applySearch)
app.get('/patients/:id', fetchPatient);
app.post('/patients', createPatient);
app.put('/patients/:id', updatePatient);
app.delete('/patients/:id', deletePatient);

app.put('/patients/prescriptions/:id', addPrescription);
app.get('/patients/prescriptions/:id', getPrescriptions);

app.get('/patient/appointments/:id', fetchPatientAppointments);
app.post('/patient/appointments/:id', createPatientAppointment);
// app.delete('/patient/appointments/:id', deletePatientAppointment);
app.get('/doctor/appointments/:id', fetchDoctorAppointments);
app.post('/doctor/appointments/:id', createDoctorAppointment);

app.get('/doctors', fetchDoctors);
app.get('/doctors/:id', fetchDoctor);
app.post('/doctors', createDoctor);
app.put('/doctors/:id', updateDoctor);
app.delete('/doctors/:id', deleteDoctor);

//Start server
app.listen(process.env.PORT);
