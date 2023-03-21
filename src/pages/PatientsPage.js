import React from 'react';
import { Container, Grid} from '@mui/material';
import ShowPatients from "../components/patients/showPatients";
import CreatePatient from "../components/patients/createPatient";
import NavBar from '../NavBar';

function PatientsPage() {

  return (
    <div>
      <NavBar/>
      <Container maxWidth="xl">
        <Grid container spacing={2} pt='30px' columnSpacing={5}>
          <Grid item xs={9}            
            lg={8}
            flexDirection="column"
            sx={{ mx: "auto"}}>
            <ShowPatients/>
          </Grid>
          <Grid item xs={3}>
            <CreatePatient/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default PatientsPage;
