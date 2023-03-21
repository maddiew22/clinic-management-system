import React from 'react';
import { Container, Grid} from '@mui/material';
import CreateDoctor from '../components/doctors/createDoctor';
import ShowDoctors from '../components/doctors/showDoctors';
import NavBar from '../NavBar';

function DoctorsPage() {

  return (
    <div>
      <NavBar/>
      <Container maxWidth="xl">
        
        <Grid container spacing={2} pt='30px' columnSpacing={5}>
          <Grid item xs={9}            
            lg={8}
            flexDirection="column"
            sx={{ mx: "auto"}}>
            <ShowDoctors/>
          </Grid>
          <Grid item xs={3}>
            <CreateDoctor/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default DoctorsPage;