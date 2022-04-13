import React from "react";
import "./login.css";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import loginImg from '../../assets/medical_care_movn.svg';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

const Login = () => {
    const theme = useTheme();

    return (
        <div className="container">
            <Card sx={{ display: 'flex', width: '60%', height: '60%', flexDirection: 'column' }}>
                <Grid container md={12} sm={12} xs={12}>
                    <Grid item md={6} sm={6} xs={12}>
                        <Box sx={{ display: 'flex', marginTop: '30px' }}>
                            <Grid container>
                                <Grid item md={12} sm={12} xs={12}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            Welcome Back!
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            Please Login to your PharmaWeb account
                                        </Typography>


                                    </CardContent>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <CardContent>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Email"
                                            type={'email'}
                                            placeholder="Enter Your Email"
                                            sx={{ width: '70%' }}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Password"
                                            type={'password'}
                                            placeholder="Enter Your Password"
                                            sx={{ width: '70%', marginTop: '20px' }}
                                        />
                                        <Button variant="contained" sx={{ width: '70%', marginTop: '20px', backgroundColor: '#00B8B0' }}>Login</Button>
                                    </CardContent>
                                    
                                </Grid>
                            </Grid>

                        </Box>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <CardMedia
                            component="img"
                            sx={{ width: '100%', height: '100%', margin: 'auto' }}
                            image={loginImg}
                            alt="Live from space album cover"
                        />
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default Login;
