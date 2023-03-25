import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableRow, TableHead, TableContainer, TableCell, Paper } from '@mui/material';
import UpdatePatient from './updatePatient';
import Prescription from '../prescriptions';
import DeletePatient from './deletePatient';
import ContactInfo from '../contactInfo';
import PatientAppointment from './appointment';

export default function ShowPatients() {
  
  useEffect(() => {
    fetchPatients()
  }, [])

  const[patients, setPatients] = useState([])
  const fetchPatients = async() => {
      const res = await axios.get("/patients");
      setPatients(res.data.patients);
  };

  // const [query, setQuery] = useState([]);
  // const applySearch = async() => {
  //   const res = await axios.get(`/patients/${query}`);
  //   setPatients(res.data.patients);
  //   console.log(patients)
  // };

  return (
    <>
    {/* <form onSubmit={applySearch}>
      <input type="text" placeholder="Search patients last name..." className="search" onChange={event => setQuery(event.target.value)}/>
      <button type="submit"> Search </button>
    </form> */}
      
        <h2> All Patients </h2>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Medical Conditions</TableCell>
                <TableCell align="right">Contact Information</TableCell>
                <TableCell align="right">Appointments</TableCell>
                <TableCell align="right">Add Prescription</TableCell>
                <TableCell align="right">Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {patients && patients.map((patient, key) => (
                <TableRow key={key}>
                <TableCell component="th" scope="row">
                    {patient.firstName}
                </TableCell>
                <TableCell align="right">{patient.lastName}</TableCell>
                <TableCell align="right">{patient.age}</TableCell>
                <TableCell align="right">{patient.conditions}</TableCell>
                <TableCell align="right"> 
                  <ContactInfo id={patient._id}/>
                </TableCell>
                <TableCell align="right"> 
                  <PatientAppointment id={patient._id}/>
                </TableCell>
                <TableCell align="right"> 
                  <Prescription id={patient._id}/>
                </TableCell>
                <TableCell align="right">
                  <DeletePatient id={patient._id}/>
                  <UpdatePatient patient={patient}/>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    
        
    </>
  );
}

