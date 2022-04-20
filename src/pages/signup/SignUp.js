import React, { useState } from "react";
import "./signup.css";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import signUpImg from '../../assets/medical_care_movn.svg';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { signUp } from "../../api";
import { useNavigate } from "react-router";

const SignUp = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerB, setRegisterB] = useState(false);
    const [registerP, setRegisterP] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };


    const SignUpSchema = Yup.object({
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
            const success = await signUp(form);
            console.log("succ", success);
            if (success.data.result.role === 0) {
                console.log("success ", success);

                navigate("/home");
            }
            else if (success.data.result.role === 1) {
                console.log("success ", success);
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
        validationSchema: SignUpSchema,
        onSubmit: (values) => {
            console.log("values", values);
            handleSignInSubmit(values)
        }
    });

    const goToLogin = () => {
        navigate('/auth/login')
    }

    const registerBuyer = () => {
        setRegisterB(true);
    }

    const registerPharmacy = () => {
        setRegisterP(true);
    }

    return (
        <div className="container">
            <Card sx={{ display: 'flex', width: '60%', height: '60%', flexDirection: 'column' }}>
                {
                    registerB || registerP ?
                        (
                            <div className="bgPic">
                                <Typography component="div" variant="h5" sx={{ marginTop: '20px' }}>
                                    Buyer Registration
                                </Typography>

                                <form>
                                    <Grid container md={12} sm={12} xs={12}>

                                        <Grid item md={6} sm={6} xs={12}>

                                            <div>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="First Name"
                                                    type={'text'}
                                                    name="firstName"
                                                    value={formik.values.firstName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter Your First Name"
                                                    sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                                />
                                                {formik.touched.v && formik.errors.firstName ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.firstName}</div></span> : null}
                                            </div>
                                            <div>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Last Name"
                                                    type={'text'}
                                                    name="lastName"
                                                    value={formik.values.lastName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter Your Last Name"
                                                    sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                                />
                                                {formik.touched.lastName && formik.errors.lastName ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.lastName}</div></span> : null}
                                            </div>
                                            <div>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Phone Number"
                                                    type={'number'}
                                                    name="phoneNumber"
                                                    value={formik.values.phoneNumber}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter Your Phone Number"
                                                    sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                                />
                                                {formik.touched.emaphoneNumberil && formik.errors.phoneNumber ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.phoneNumber}</div></span> : null}
                                            </div>
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
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
                                                        sx={{ width: '80%', marginBottom: '10px' }}
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
                                                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
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
                                                <div>
                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Confirm Password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="confirmPassword"
                                                        value={formik.values.confirmPassword}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        handleShowPassword={handleShowPassword}
                                                        placeholder="Enter Your Password Again"
                                                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
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
                                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div></span> : null}
                                                </div>

                                            </CardContent>
                                        </Grid>
                                    </Grid>

                                    <Button type="submit" variant="contained" sx={{ width: '70%', marginTop: '20px', backgroundColor: '#00B8B0' }} className="button" >Sign Up</Button>
                                    
                                </form>
                                <a style={{ cursor: 'pointer', marginRight: '50px', float: 'right', marginTop: '20px', color: '#F8AF86' }} onClick={goToLogin}>Already have an account?</a>
                            </div>
                        ) :
                        (
                            <Grid container md={12} sm={12} xs={12}>
                                <Grid item md={6} sm={6} xs={12}>
                                    <Box sx={{ display: 'flex', marginTop: '30px' }}>
                                        <form onSubmit={formik.handleSubmit}>
                                            <Grid container>
                                                <Grid item md={12} sm={12} xs={12}>
                                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                                        <Typography component="div" variant="h5">
                                                            Welcome To PharmaWeb!
                                                        </Typography>
                                                    </CardContent>
                                                </Grid>
                                                <Grid item md={12} sm={12} xs={12}>
                                                    <CardContent>
                                                        <Grid container sx={{ marginBottom: '20px', justifyContent: 'center' }}>

                                                            <Typography variant="h6" color="text.secondary" component="div" sx={{ marginTop: '50px' }}>
                                                                Are you a Buyer or a Pharmacy?
                                                            </Typography>
                                                            <Grid item md={6} sm={6} xs={12}>
                                                                <Button type="submit" variant="contained" className="button" sx={{ width: '70%', marginTop: '20px', backgroundColor: '#00B8B0' }} onClick={registerBuyer}>Buyer</Button>
                                                            </Grid>
                                                            <Grid item md={6} sm={6} xs={12}>
                                                                <Button type="submit" variant="contained" className="button" sx={{ width: '70%', marginTop: '20px', backgroundColor: '#00B8B0' }} onClick={registerPharmacy}>Pharmacy</Button>
                                                            </Grid>
                                                        </Grid>
                                                        <a style={{ cursor: 'pointer', marginLeft: '200px', color: '#F8AF86' }} onClick={goToLogin}>Already have an account?</a>
                                                        {/* <div>
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
                                                    sx={{ width: '80%' }}
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
                                                    sx={{ width: '80%', marginTop: '20px' }}
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
                                            <a style={{ marginTop: '10px', cursor: 'pointer', marginLeft: '120px' }} onClick={goToSignUp}>Don't have an account yet?</a>
                                            <Button type="submit" variant="contained" sx={{ width: '80%', marginTop: '20px', backgroundColor: '#00B8B0' }}>SignUp</Button>
                                        */}
                                                    </CardContent>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Box>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: '100%', height: '100%', margin: 'auto', }}
                                        image={signUpImg}
                                        alt="Live from space album cover"
                                    />
                                </Grid>
                            </Grid>
                        )
                }
            </Card>
        </div>
    );
};

export default SignUp;
