import React from "react";
import { useState } from "react";
import { Box, TextField, Button} from '@mui/material';
import axios from "axios";

export default function UpdatePatient(props) {
  
    const [updatePatient, setUpdatePatient] = useState({
    _id: null,
    firstName: '',
    lastName: '',
    age: 0,
    conditions: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const toggleUpdate = (patient) => {
    setUpdatePatient({
        _id: patient._id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        age: patient.age,
        conditions: patient.conditions,
        email: patient.email,
        phoneNumber: patient.phoneNumber,
        address: patient.address,
    });
  };

  const update = async() => {
    const updatedPatient = updatePatient;
    await axios.put(`/patients/${updatePatient._id}`, updatedPatient).then(() => {
        window.location.reload(false)
    })
  };

  return (
    <>
        <Button onClick={() => toggleUpdate(props.patient)}> Update </Button>
        {updatePatient._id && <div>
            <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField id="outlined-basic" label="First Name" variant="outlined" value={updatePatient.firstName} onChange={(event => {
            setUpdatePatient({ ...updatePatient, firstName: event.target.value})
            })}/>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" value={updatePatient.lastName} onChange={(event => {
            setUpdatePatient({ ...updatePatient, lastName: event.target.value})
            })}/>
            <TextField id="outlined-basic" label="Age" variant="outlined" value={updatePatient.age} onChange={(event => {
            setUpdatePatient({ ...updatePatient, age: event.target.value})
            })}/>
            <TextField id="outlined-basic" label="Medical Conditions" variant="outlined" value={updatePatient.conditions} onChange={(event => {
            setUpdatePatient({ ...updatePatient, conditions: event.target.value})
            })}/>
            <TextField id="outlined-basic" label="Email" variant="outlined" value={updatePatient.email} onChange={(event => {
            setUpdatePatient({ ...updatePatient, email: event.target.value})
            })}/>
            <TextField id="outlined-basic" label="Phone Number" variant="outlined" value={updatePatient.phoneNumber} onChange={(event => {
            setUpdatePatient({ ...updatePatient, phoneNumber: event.target.value})
            })}/>
            <TextField id="outlined-basic" label="Address" variant="outlined" value={updatePatient.address} onChange={(event => {
            setUpdatePatient({ ...updatePatient, address: event.target.value})
            })}/>
            <Button variant="contained" onClick={() => update(updatePatient._id)}>Save</Button>
            <Button variant="contained" onClick={() => setUpdatePatient({_id:null})}>Cancel</Button>
            </Box>
            </div>}
        </>
  )
}
