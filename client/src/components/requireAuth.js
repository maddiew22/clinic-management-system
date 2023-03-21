import React, { useEffect } from 'react'
import authStores from '../stores/authStores';
import { Navigate } from 'react-router-dom';

export default function RequireAuth(props) {
    const store = authStores();

    useEffect(() => {
        if(store.loggedIn === null){
            store.checkAuth();
        }
    }, [])


    if(store.loggedIn===false) {
        return (
            <Navigate to='/login'/>
        );
    }
    
    
    return (
        <div>{props.children}</div>
    )
}
