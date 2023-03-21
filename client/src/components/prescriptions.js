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
        width: '60%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
      fetchPrescriptions();
    }
    const handleClose = () => setOpen(false);

     const [listOfPrescriptions, setListOfPrescriptions] = useState([])
      const fetchPrescriptions = async() => {
        const res = await axios.get(`/patients/prescriptions/${props.id}`);
        setListOfPrescriptions(res.data.patient.prescriptions);
    };


    const [prescriptions, setPrescription] = useState({
        prescriptions: {
            medicineName: "",
            prescriptionLength: "",
            date: "",
        }
      });

      const createPrescription = async() => {
        await axios.put(`http://localhost:3000/patients/prescriptions/${props.id}`, prescriptions).then( () => {
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
            <Box
            component="form"
            minHeight="20vh"
            width="100%"
            noValidate
            autoComplete="off">
        <h2> Prescriptions </h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Medicine Name</TableCell>
                <TableCell align="right">Prescription Length</TableCell>
                <TableCell align="right">Start Date</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {listOfPrescriptions && listOfPrescriptions.map((prescription, key) => (
                <TableRow key={key}>
                <TableCell component="th" scope="row">
                    {prescription.medicineName}
                </TableCell>
                <TableCell align="right">{prescription.prescriptionLength}</TableCell>
                <TableCell align="right">{prescription.date}</TableCell>
                </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
    <h2> Add New Prescription </h2>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Medicine Name" variant="outlined" value={prescriptions.medicineName} onChange={(event => {
        setPrescription({ ...prescriptions, medicineName: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Prescription Length" variant="outlined" value={prescriptions.prescriptionLength} onChange={(event => {
        setPrescription({ ...prescriptions, prescriptionLength: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Start Date" variant="outlined" value={prescriptions.date} onChange={(event => {
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