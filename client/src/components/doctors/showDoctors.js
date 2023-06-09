import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableRow, TableHead, TableContainer, TableCell, Paper } from '@mui/material';
import UpdateDoctor from './updateDoctor';
import DeleteDoctor from './deleteDoctor';
import Appointment from './appointments';


export default function ShowDoctors() {
  
  useEffect(() => {
    fetchDoctors()
  }, [])

  const[doctors, setDoctors] = useState([])
  const fetchDoctors = async() => {
      const res = await axios.get("/doctors");
      console.log(res)
      setDoctors(res.data.doctors);
  };

  const [query, setQuery] = useState([]);
  const applySearch = async(query) => {
    const res = await axios.get(`/doctors/${query}`);
    setDoctors(res.data.doctors);
    console.log(doctors)
  };

  return (
    <>
        <form onSubmit={applySearch(query)}>
          <input type="text" placeholder="Search by last name..." className="search" onChange={event => setQuery(event.target.value)}/>
          <button type="submit"> Search </button>
        </form>
        
        <h2> All Doctors </h2>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Specialty</TableCell>
                <TableCell align="right">Appointments</TableCell>
                <TableCell align="right">Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {doctors && doctors.map((doctor, key) => (
                <TableRow key={key}>
                <TableCell component="th" scope="row">
                    {doctor.firstName}
                </TableCell>
                <TableCell align="right">{doctor.lastName}</TableCell>
                <TableCell align="right">{doctor.specialty}</TableCell>
                <TableCell align="right"> 
                  <Appointment id={doctor._id}/>
                </TableCell>
                <TableCell align="right">
                  <DeleteDoctor id={doctor._id}/>
                  <UpdateDoctor doctor={doctor}/>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    
        
    </>
  );
}
