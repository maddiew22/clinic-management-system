import React from "react";
import { useState } from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeletePatient(props) {

    const deletePatient = async(id) => {
        await axios.delete(`/patients/${id}`).then(() => {
          window.location.reload(false)
      })};

    return (
        <>
            <IconButton aria-label="delete" onClick={() => deletePatient(props.id)}>
                <DeleteIcon />
            </IconButton>
        </>
    );
}