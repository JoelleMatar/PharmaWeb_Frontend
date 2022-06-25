import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { getPharmaciesList } from '../../../api';
import LocationOn from "@mui/icons-material/LocationOn";
import LocalPhone from "@mui/icons-material/LocalPhone";
import Email from "@mui/icons-material/Email";
import CardMedia from '@mui/material/CardMedia';
import pharmacyLogoStatic from '../../../assets/pharmacyLogo.png';
import Grid from "@mui/material/Grid";
import PharmacyDetails from './PharmacyDetails';

const HomePharmacyCard = ({ pharmacy }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card sx={{ minWidth: 275, boxShadow: ' 0px 2px 0px 2px #cccccc', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleClickOpen()}>
            <Grid container>
                <Grid item xs={12} sm={8} md={8}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold', marginBottom: '20px' }} gutterBottom>
                            {pharmacy.pharmacyName}
                        </Typography>
                        <Typography sx={{ mb: 1.5, display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '100%' }} component="div">
                            <LocationOn sx={{ color: '#ffa26cd7', marginRight: '20px' }} /> {pharmacy.city}
                        </Typography>
                        <Typography sx={{ mb: 1.5, display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '100%' }} component="div">
                            <LocalPhone sx={{ color: '#ffa26cd7', marginRight: '20px' }} /> {pharmacy.phoneNumber}
                        </Typography>
                        <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '100%' }} component="div">
                            <Email sx={{ color: '#ffa26cd7', marginRight: '20px' }} /> {pharmacy.email}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <div style={{ width: '100px', height: '100px' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: '100%', height: '100%', marginTop: '40px', marginLeft: '10px' }}
                            image={pharmacy.image || pharmacyLogoStatic}
                            alt={pharmacy.pharmacyName}
                        />
                    </div>
                </Grid>
            </Grid>

            <PharmacyDetails pharmacy={pharmacy} open={open} close={handleClose} />
        </Card>
    )
}

export default HomePharmacyCard