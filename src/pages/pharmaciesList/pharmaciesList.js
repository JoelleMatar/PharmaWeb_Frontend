import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HomePharmacyCard from '../../components/pharmacy/homePharmacyCard/HomePharmacyCard';
import { getPharmaciesList } from '../../api';
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const PharmaciesList = () => {
    const [pharmacies, setPharmacy] = useState([]);

    useEffect(async () => {
        const request = await getPharmaciesList();

        setPharmacy(request.data.data);
    }, []);

    console.log("pharmacies", pharmacies)

    return (
        <>
        <Grid container sx={{width: '90%', marginBottom: '80px'}}>
            <Navbar />
            <Grid item md={12} sm={12} xs={12} sx={{ paddingTop: "120px", textAlign: 'left', marginLeft: '6%' }}>
                <Typography variant="h4" sx={{color: '#00B8B0',}} gutterBottom>
                    Phamracies List
                </Typography>
            </Grid>

            <Grid item>
                <Box sx={{ flexGrow: 1,  width: '100%' }}>
                    <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2} sx={{ paddingTop: '40px', marginLeft: '5%' }}>
                        {
                            pharmacies.map((pharmacy) => {
                                return (
                                    <Grid item xs={12} sm={4} md={4} key={pharmacy._id}>
                                        <HomePharmacyCard pharmacy={pharmacy} />
                                    </Grid>
                                )

                            })
                        }

                    </Grid>
                </Box>
            </Grid>

        </Grid>
        <Footer />
    </>
    )
}

export default PharmaciesList