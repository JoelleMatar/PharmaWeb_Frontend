import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./HomePharmacyCard.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PharmacyDetails({ open, close, pharmacy }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    console.log("pharmacyyy", pharmacy)

    const handleClose = () => {
        window.location.reload()
    }

    const mailto = () => {
        window.location.href = "mailto:" + pharmacy.email
    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title2"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="responsive-dialog-title2">
                    {"Pharmacy Details"}
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '1px' }}>
                    <DialogContentText>
                        <Accordion expanded={true}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{ fontSize: 20 }}>Basic Information</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Card sx={{ minWidth: 275, boxShadow: ' 0px 0px  #cccccc', marginBottom: '20px' }}>
                                    <CardContent>
                                        <Typography variant="h4" sx={{ color: '#00B8B0' }} component="div">
                                            {pharmacy.pharmacyName}
                                        </Typography>
                                        <Grid container>
                                            <Grid item md={6} sm={6} xs={12}>
                                                <Typography variant="h6">
                                                    Located in <b>{pharmacy.city}</b> <br />
                                                    Email Address <a onClick={mailto}><i><b>{pharmacy.email}</b></i></a> <br />
                                                    Phone Number <i><b>{pharmacy.phoneNumber}</b></i> <br />
                                                    Location <i><b>{pharmacy?.maps ? pharmacy?.maps : '-'}</b></i> <br />
                                                </Typography>
                                            </Grid>
                                            <Grid item md={6} sm={6} xs={12}>
                                                <Typography variant="h6">
                                                    <ul>
                                                        <li>
                                                            Offers
                                                            {
                                                                pharmacy.deliveryOptions.length > 1 ? (
                                                                    <span> both <i><b>Delivery</b></i> and <i><b>Pick Up </b></i>options for its drugs</span>
                                                                ) : (
                                                                    <span> <i><b>{pharmacy.deliveryOptions[0]}</b></i></span>
                                                                )
                                                            }
                                                        </li>
                                                        <li>
                                                            Accepts
                                                            {
                                                                pharmacy.paymentOptions.length > 1 ? (
                                                                    <span> both <i><b>Online Payment</b></i> and <i><b>Cash On Delivery </b></i>options for its orders</span>
                                                                ) : (
                                                                    <span> <i><b>{pharmacy.paymentOptions[0]}</b></i></span>
                                                                )
                                                            }
                                                        </li>
                                                    </ul>


                                                </Typography>
                                            </Grid>

                                        </Grid>

                                    </CardContent>
                                </Card>
                            </AccordionDetails>
                        </Accordion>


                        {/* <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{ fontSize: 20 }}>Reviews</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Card sx={{ minWidth: 275, boxShadow: ' 0px 2px 0px 2px #cccccc', marginBottom: '20px' }}>
                                    <CardContent>
                                        <Typography variant="h4" sx={{ color: '#00B8B0' }} component="div">
                                            {pharmacy.pharmacyName}
                                        </Typography>
                                        <Grid container>
                                            <Grid item md={6} sm={6} xs={12}>
                                                <Typography variant="h6">
                                                    Located in <b>{pharmacy.city}</b> <br />
                                                    Email Address <a onClick={mailto}><i><b>{pharmacy.email}</b></i></a> <br />
                                                    Phone Number <i><b>{pharmacy.phoneNumber}</b></i>
                                                </Typography>
                                            </Grid>
                                            <Grid item md={6} sm={6} xs={12}>
                                                <Typography variant="h6">
                                                    <ul>
                                                        <li>
                                                            Offers
                                                            {
                                                                pharmacy.deliveryOptions.length > 1 ? (
                                                                    <span> both <i><b>Delivery</b></i> and <i><b>Pick Up </b></i>options for its drugs</span>
                                                                ) : (
                                                                    <span> <i><b>{pharmacy.deliveryOptions[0]}</b></i></span>
                                                                )
                                                            }
                                                        </li>
                                                        <li>
                                                            Accepts
                                                            {
                                                                pharmacy.paymentOptions.length > 1 ? (
                                                                    <span> both <i><b>Online Payment</b></i> and <i><b>Cash On Delivery </b></i>options for its orders</span>
                                                                ) : (
                                                                    <span> <i><b>{pharmacy.paymentOptions[0]}</b></i></span>
                                                                )
                                                            }
                                                        </li>
                                                    </ul>


                                                </Typography>
                                            </Grid>

                                        </Grid>

                                    </CardContent>
                                </Card>
                            </AccordionDetails>
                        </Accordion> */}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} sx={{ color: '#ffa26c', marginRight: '20px', marginBottom: '10px' }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
