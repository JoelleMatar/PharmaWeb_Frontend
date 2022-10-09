import TextField from '@mui/material/TextField';
import { useState, useEffect, useRef } from 'react';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import donateD from "../../assets/donateDrugs.jpg";
import purchase from "../../assets/4.jpg";
import requestDrugs from "../../assets/5.jpg";
import pharmacies from "../../assets/pharmacies.jpg";
import "./homeServicesCards.css";
import { useNavigate } from 'react-router';

const HomeServicesCards = () => {
    const navigate = useNavigate();

    const goTo = (path) => {
        navigate(path)
    }

    return (
        <div className="homeServicesCards"  style={{marginBottom: '80px', marginTop: '100px'}}>
            <Typography className='suggestions' variant="h5" gutterBottom component="div" sx={{color: '#003633'}}>Available Services</Typography>
            <Grid container sx={{  paddingLeft: '30px' }}>

                <Grid item md={3} sm={6} xs={12} >
                    <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => goTo('/home/donate-medication')}>
                        {/* <CardActionArea> */}
                        <CardMedia
                            component="img"
                            height="140"
                            sx={{ marginTop: 0 }}
                            image={donateD}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{color: '#003633'}}>
                                Donate Medication
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Donate medical supplies or equipment in good condition for people in need
                            </Typography>
                        </CardContent>
                        {/* </CardActionArea> */}
                    </Card>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <Card sx={{ maxWidth: 345, cursor: 'pointer' }}  onClick={() => goTo('/home/request-drug')}>
                        {/* <CardActionArea> */}
                        <CardMedia
                            component="img"
                            height="140"
                            sx={{ marginTop: 0, height: '345px', objectFit: 'fill' }}
                            image={requestDrugs}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{color: '#003633'}}>
                                Request Product
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Didn't find your medicine? Request it from our registered pharmacies
                            </Typography>
                        </CardContent>
                        {/* </CardActionArea> */}
                    </Card>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => goTo('/home/products')}>
                        {/* <CardActionArea> */}
                        <CardMedia
                            component="img"
                            height="140"
                            sx={{ marginTop: 0 , height: '345px', objectFit: 'scale-down'}}
                            image={purchase}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{color: '#003633'}}>
                                Purchase Medication
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Purchase medical supplies or equipment from our registered pharmacies
                            </Typography>
                        </CardContent>
                        {/* </CardActionArea> */}
                    </Card>
                </Grid>
                <Grid item md={3} sm={6} xs={12} onClick={() => goTo('/auth/signup')}>
                    <Card sx={{ maxWidth: 345, cursor: 'pointer' }}>
                        {/* <CardActionArea> */}
                        <CardMedia
                            component="img"
                            height="140"
                            sx={{ marginTop: 0, minHeight: '345px' }}
                            image={pharmacies}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{color: '#003633'}}>
                                Pharmacy Registration
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Register as a pharmacy to sell your products. Check people's order and more
                            </Typography>
                        </CardContent>
                        {/* </CardActionArea> */}
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomeServicesCards