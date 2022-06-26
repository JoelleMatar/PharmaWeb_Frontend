import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { createRefillLog, getPharmacyProducts, updateCheckoutStatus } from '../../api';
import { useState, useEffect } from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormik, } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router";


export default function ViewPrescription({ open, close, prescription }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    console.log("prescription", prescription)

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={close}
                fullWidth
                maxWidth="md"
            >
                    <DialogTitle>
                        {"Product Doctor Prescription"}
                    </DialogTitle>
                    <DialogContent sx={{ overflowY: 'hidden', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <DialogContentText sx={{width: '900px', height: '500px'}}>
                            <img src={prescription} width="100%" height="100%" style={{marginTop: 0}} />
                        </DialogContentText>
                    </DialogContent>
            </Dialog>
        </div >
    );
}
