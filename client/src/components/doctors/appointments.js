import { Alert, Button, TextField, Modal, Box, Table, TableBody, TableRow, TableHead, TableContainer, TableCell, Paper, createFilterOptions } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import * as moment from 'moment'

export default function Appointment(props) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
      fetchAppointments();
    }
    const handleClose = () => setOpen(false);

     const [listOfAppointments, setListOfAppointments] = useState([])
      const fetchAppointments = async() => {
        const res = await axios.get(`/doctor/appointments/${props.id}`);
        setListOfAppointments(res.data.appointments);
    };


    const [appointments, setAppointments] = useState({
        appointments: {
            patientName: "",
            patientId: "",
            doctorName: "",
            doctorId: "",
            reasonForAppointment: "",
            date: "",
            time: "",
        }
      });

      const [alert, setAlert] = useState(false);
      const [alertContent, setAlertContent] = useState('');
      const [alertSeverity, setAlertSeverity] = useState('');

      const createAppointment = async() => {
        try {
            await axios.post(`/doctor/appointments/${props.id}`, appointments);
            setAlertContent("Appointment Booked");
            setAlert(true);
            setAlertSeverity('success');
        }
        catch (err) {
            console.log(err.response.data.message);
            setAlertContent(err.response.data.message);
            setAlert(true);
            setAlertSeverity('error');
        }

      }

    return(
        <>
        <Button variant="outlined" size="small" color="inherit" onClick={handleOpen}> Appointments </Button>
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
        <h2> Appointments </h2>
        {alert ? <Alert severity={alertSeverity}>{alertContent}</Alert> : <></> }
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell align="right">Reason for Appointment</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Notes</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {listOfAppointments && listOfAppointments.map((appointments, key) => (
                <TableRow key={key}>
                <TableCell component="th" scope="row">
                    {appointments.patientName}
                </TableCell>
                <TableCell align="right">{appointments.reasonForAppointment}</TableCell>
                <TableCell align="right">{moment(appointments.date).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="right">{appointments.time}</TableCell>
                <TableCell align="right">{appointments.notes}</TableCell>               
                </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
    <h2> Add New Appointment </h2>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Patient Name" variant="outlined" value={appointments.patientName} onChange={(event => {
        setAppointments({ ...appointments, patientName: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Patient ID" variant="outlined" value={appointments.patientId} onChange={(event => {
        setAppointments({ ...appointments, patientId: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Reason for Appointment" variant="outlined" value={appointments.reasonForAppointment} onChange={(event => {
        setAppointments({ ...appointments, reasonForAppointment: event.target.value})
      })}/>
      <TextField id="outlined-basic" variant="outlined" type="date" value={appointments.date} onChange={(event => {
        setAppointments({ ...appointments, date: event.target.value})
      })}/>
      <TextField id="outlined-basic" variant="outlined" type="time" value={appointments.time} onChange={(event => {
        setAppointments({ ...appointments, time: event.target.value})
      })}/>
      <TextField id="outlined-basic" label="Notes" variant="outlined" value={appointments.note} onChange={(event => {
        setAppointments({ ...appointments, notes: event.target.value})
      })}/>
      <Button variant="contained" onClick={createAppointment}>Add</Button>   
    </Box>
        </Box>
        </Box>
        </Modal>      
        </>
    );
};