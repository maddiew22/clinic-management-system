import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function CreateDoctor() {
  const [doctor, setDoctor] = useState({
    firstName: '',
    lastName: '',
    specialty: '',
  });
  
  const createDoctor = async() => {
    await axios.post('/doctors', doctor).then( () => {
        window.location.reload(false);
    })
  }
  return (
    <>
    <h2> New Doctor </h2>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="First Name" variant="outlined" value={doctor.firstName} onChange={(event => {
        setDoctor({ ...doctor, firstName: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Last Name" variant="outlined" value={doctor.lastName} onChange={(event => {
        setDoctor({ ...doctor, lastName: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Specialty" variant="outlined" value={doctor.age} onChange={(event => {
        setDoctor({ ...doctor, specialty: event.target.value})
      })}/>
      <Button variant="contained" onClick={createDoctor}>Add</Button>
    </Box>
    </>
  );
}