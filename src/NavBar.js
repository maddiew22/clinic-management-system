import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, } from '@mui/material';
import { Link } from 'react-router-dom';

  
// Exporting Default Navbar to the App.js File
export default function Navbar() {

  
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
        <Link to='/'>
            <Typography variant='subtitle1' color="white" padding="20px">
               Patients 
            </Typography>
            
            </Link>
        <Link to='/doctors'>
            <Typography variant='subtitle1' color="white" padding="20px">
               Doctors 
            </Typography>
        </Link>
        <Link to='/logout'>
            <Typography variant='subtitle1' color="white" padding="20px">
               Logout  
            </Typography>
        </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}