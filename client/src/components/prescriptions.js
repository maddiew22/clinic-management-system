import { Button, TextField, Modal, Box, Typography, Table, TableBody, TableRow, TableHead, TableContainer, TableCell, Paper } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Prescription(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [prescriptions, setPrescription] = useState({
        prescriptions: {
            medecineName: "",
            prescriptionLength: "",
            date: "",
        }
      });
      
      const createPrescription = async() => {
        await axios.post(`http://localhost:3000/patients/${props._id}/prescription`, prescriptions).then( () => {
            window.location.reload(false);
        })
      }

    return(
        <>
        <Button variant="outlined" size="small" color="inherit" onClick={handleOpen}> Prescribe </Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Prescriptions
            </Typography>
            <Box
            component="form"
            minHeight="20vh"
            width="100%"
            noValidate
            autoComplete="off">
    <h2> New Prescription </h2>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Medecine Name" variant="outlined" value={prescriptions.medecineName} onChange={(event => {
        setPrescription({ ...prescriptions, medecineName: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Prescription Length" variant="outlined" value={prescriptions.lastName} onChange={(event => {
        setPrescription({ ...prescriptions, prescriptionLength: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Date" variant="outlined" value={prescriptions.age} onChange={(event => {
        setPrescription({ ...prescriptions, date: event.target.value})
      })}/>
      <Button variant="contained" onClick={createPrescription}>Add</Button>   
    </Box>
        </Box>
        </Box>
        </Modal>      
        </>
    );
};