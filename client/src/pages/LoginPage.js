import React from 'react';
import { Grid } from '@mui/material';
import LoginForm from '../components/loginForm';
import authStores from '../stores/authStores';

function LoginPage() {
  const store = authStores();
 
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <h1> Hospital Management System </h1>
      <Grid item xs={3}>
      <LoginForm />
      </Grid>   
      
</Grid> 
  );
  
}

export default LoginPage;