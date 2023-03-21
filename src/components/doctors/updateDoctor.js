import React from "react";
import { useState } from "react";
import { Box, TextField, Button} from '@mui/material';
import axios from "axios";

export default function UpdateDoctor(props) {
  
    const [updateDoctor, setUpdateDoctor] = useState({
    _id: null,
    firstName: '',
    lastName: '',
    specialty: '',
  });

  const toggleUpdate = (doctor) => {
    setUpdateDoctor({
        _id: doctor._id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        specialty: doctor.specialty,
    });
  };

  const update = async() => {
    const updatedDoctor = updateDoctor;
    await axios.put(`/doctors/${updateDoctor._id}`, updatedDoctor).then(() => {
        window.location.reload(false)
    })
  };

  return (
    <>
        <Button onClick={() => toggleUpdate(props.doctor)}> Update </Button>
        {updateDoctor._id && <div>
            <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField id="outlined-basic" label="First Name" variant="outlined" value={updateDoctor.firstName} onChange={(event => {
            setUpdateDoctor({ ...updateDoctor, firstName: event.target.value})
            })}/>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" value={updateDoctor.lastName} onChange={(event => {
            setUpdateDoctor({ ...updateDoctor, lastName: event.target.value})
            })}/>
            <TextField id="outlined-basic" label="Specialty" variant="outlined" value={updateDoctor.specialty} onChange={(event => {
            setUpdateDoctor({ ...updateDoctor, specialty: event.target.value})
            })}/>
            <Button variant="contained" onClick={() => update(updateDoctor._id)}>Save</Button>
            <Button variant="contained" onClick={() => setUpdateDoctor({_id:null})}>Cancel</Button>
            </Box>
            </div>}
        </>
  )
}