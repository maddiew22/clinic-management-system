import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import authStores from '../stores/authStores'
import { Grid } from '@mui/material';

export default function LogoutPage() {
    const store = authStores();
    const navigate = useNavigate();

    useEffect(() => {
        store.logout();
        returnToLogin();
    },[])

    const returnToLogin = async() => {
        await new Promise(r => setTimeout(r, 2000));
        navigate("/login")
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
            >
            <Grid item xs={3}>
                <h3 className="Auth-form-title">You have been logged out. </h3>  
            </Grid>   
        </Grid> 
    )
}
