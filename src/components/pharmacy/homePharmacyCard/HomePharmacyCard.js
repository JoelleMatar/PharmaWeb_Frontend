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

const HomePharmacyCard = ({ pharmacy }) => {
    console.log("pharmaaa", pharmacy)
    console.log("hii")

    return (
        <Card sx={{ minWidth: 275, boxShadow: ' 0px 2px 0px 2px #cccccc', marginBottom: '10px'  }}>
            <CardContent>
                <Typography sx={{ fontSize: 20, color: '#00B8B0', fontWeight: 'bold', }} gutterBottom>
                    {pharmacy.pharmacyName}
                </Typography>
                <Typography sx={{ fontSize: 15 }} component="div">
                   <LocationOn /> {pharmacy.city}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                   <LocalPhone /> {pharmacy.phoneNumber}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default HomePharmacyCard