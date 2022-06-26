import Grid from "@mui/material/Grid";
import React from "react";
import Typography from "@mui/material/Typography";
import logo from "../../assets/logoPharma.png";
import "./Footer.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer() {
    return (
        <Grid container className="footer">
            <Grid item md={4} sm={4} xs={12}>
                <img src={logo} className="logofooter" />
            </Grid>
            <Grid item md={4} sm={4} xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '150px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    <b>Services</b>
                </Typography>
                <Typography gutterBottom variant="h6" component="a" sx={{ color: '#212B36' }} href="/home/donate-medication">
                    Donate Medication
                </Typography>
                <Typography gutterBottom variant="h6" component="a" sx={{ color: '#212B36' }} href="/home/request-drug">
                    Request Product
                </Typography>
                <Typography gutterBottom variant="h6" component="a" sx={{ color: '#212B36' }} href="/home/products">
                    Purchase Medication
                </Typography>
                <Typography gutterBottom variant="h6" component="a" sx={{ color: '#212B36' }} href="/auth/signup">
                    Pharmacy Registration
                </Typography>
            </Grid>
            <Grid item md={4} sm={4} xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '150px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    <b>Keep in Touch</b>
                </Typography>
                <div>
                    <InstagramIcon sx={{ width: '40px', height: '40px', marginRight: '10px' }} />
                    <FacebookIcon sx={{ width: '40px', height: '40px' }} />
                </div>
            </Grid>
        </Grid>
    )
}