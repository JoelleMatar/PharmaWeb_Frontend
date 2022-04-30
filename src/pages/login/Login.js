import React, { useState } from "react";
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
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { login } from "../../api";
import { useNavigate } from "react-router";

const Login = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };


    const LoginSchema = Yup.object({
        email: Yup.string().email("Email must be valid").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    });

    const handleSignInSubmit = async (values) => {
        // setLoading(true)
        console.log("valuesss submit", values)
        let email = values.email;
        email = email.trim();
        email = email.charAt(0).toLowerCase() + email.slice(1);
        const form = {
            email: email,
            password: values.password
        }
        console.log("form", form);

        try {
            const success = await login(form);
            console.log("succ", success);
            if (success.data.result.role === 0) {
                console.log("success ", success);
                localStorage.setItem('profile', JSON.stringify(success.data.result));
                navigate("/home");
            }
            else if (success.data.result.role === 1) {
                console.log("success ", success);
                localStorage.setItem('profile', JSON.stringify(success.data.result));
                navigate("/pharmacy/dashboard");
            }
        }
        catch (error) {
            console.log("error", error);
        }

    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            console.log("values", values);
            handleSignInSubmit(values)
        }
    });

    const goToSignUp = () => {
        navigate('/auth/signup')
    }

    return (
        <div className="container">
            <Card sx={{ display: 'flex', width: '60%', height: '60%', flexDirection: 'column', overflowY: 'scroll' }}>
                <Grid container md={12} sm={12} xs={12}>
                    <Grid item md={6} sm={6} xs={12}>
                        <Box sx={{ display: 'flex', marginTop: '30px' }}>
                            <form onSubmit={formik.handleSubmit}>
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
                                            <div>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Email"
                                                    type={'email'}
                                                    name="email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter Your Email"
                                                    sx={{ width: '70%' }}
                                                />
                                                {formik.touched.email && formik.errors.email ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.email}</div></span> : null}
                                            </div>
                                            <div>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={formik.values.password}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    handleShowPassword={handleShowPassword}
                                                    placeholder="Enter Your Password"
                                                    sx={{ width: '70%', marginTop: '20px', marginBottom: '10px' }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {
                                                                    showPassword ? <VisibilityOffIcon onClick={handleShowPassword} sx={{ cursor: 'pointer' }} /> : <VisibilityIcon onClick={handleShowPassword} sx={{ cursor: 'pointer' }} />
                                                                }

                                                            </InputAdornment>
                                                        )
                                                    }}
                                                >
                                                </TextField>
                                                {formik.touched.password && formik.errors.password ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.password}</div></span> : null}
                                            </div>
                                            <a style={{ cursor: 'pointer', marginLeft: '120px', color: '#F8AF86' }} onClick={goToSignUp}>Don't have an account yet?</a>
                                            <Button type="submit" variant="contained" sx={{ width: '70%', marginTop: '20px', backgroundColor: '#00B8B0' }} className="button" >Login</Button>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <CardMedia
                            component="img"
                            sx={{ width: '100%', margin: 'auto', maxWidth: '100%', height: 'auto' }}
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
