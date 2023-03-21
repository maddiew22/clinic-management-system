import React from "react";
import { useState } from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteDoctor(props) {

    const deleteDoctor = async(id) => {
        await axios.delete(`/doctors/${id}`).then(() => {
          window.location.reload(false)
      })};

    return (
        <>
            <IconButton aria-label="delete" onClick={() => deleteDoctor(props.id)}>
                <DeleteIcon />
            </IconButton>
        </>
    );
}