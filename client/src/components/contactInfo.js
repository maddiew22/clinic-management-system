import { Button, Modal, Box, Typography, Table, TableBody, TableRow, TableHead, TableContainer, TableCell, Paper } from '@mui/material';
import * as React from 'react';
import { useState} from 'react';
import axios from 'axios';


export default function ContactInfo(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: 150,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);    
    const[patient, setPatient] = useState([])
    const handleOpen = async() => {
        setOpen(true); 
        const res = await axios.get(`/patients/${props.id}`);
        setPatient(res.data.patient);  
    }
    const handleClose = () => setOpen(false);

    return(
        <>
        <Button variant="outlined" size="small" color="inherit" onClick={handleOpen}> Contact Info </Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Contact Information
            </Typography>
            <Box
            component="form"
            minHeight="20vh"
            width="100%"
            noValidate
            autoComplete="off"
            >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">Phone Number</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
      
                    <TableRow>
                        <TableCell component="th" scope="row">
                            {patient.email}
                        </TableCell>
                        <TableCell align="right">{patient.address}</TableCell>
                        <TableCell align="right">{patient.phoneNumber}</TableCell>
                    </TableRow>
                
                </TableBody>
                </Table>
            </TableContainer>
            
            </Box>
        </Box>
        </Modal>      
        </>

    );
};

