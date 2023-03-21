import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from "axios";


export default function CreatePatient() {

  const [patient, setPatient] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    conditions: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  
  const createPatient = async() => {
    await axios.post('/patients', patient).then( () => {
        window.location.reload(false);
    })
  }
  return (
    <>
    <h2> New Patient </h2>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="First Name" variant="outlined" value={patient.firstName} onChange={(event => {
        setPatient({ ...patient, firstName: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Last Name" variant="outlined" value={patient.lastName} onChange={(event => {
        setPatient({ ...patient, lastName: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Age" variant="outlined" value={patient.age} onChange={(event => {
        setPatient({ ...patient, age: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Medical Conditions" variant="outlined" value={patient.conditions} onChange={(event => {
        setPatient({ ...patient, conditions: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Email" variant="outlined" value={patient.email} onChange={(event => {
        setPatient({ ...patient, email: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Phone Number" variant="outlined" value={patient.phoneNumber} onChange={(event => {
        setPatient({ ...patient, phoneNumber: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Address" variant="outlined" value={patient.address} onChange={(event => {
        setPatient({ ...patient, address: event.target.value})
      })}/>
      <Button variant="contained" onClick={createPatient}>Add</Button>
    </Box>
    </>
  );
}