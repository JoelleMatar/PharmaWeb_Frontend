import React, { useState } from "react";
import "./signup.css";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import signUpImg from '../../assets/loginPhoto.jpeg';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { signUpBuyer } from "../../api/index";
import { useNavigate } from "react-router";


import PharmacyRegistration from "./PharmacyRegistration";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SignUp = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerB, setRegisterB] = useState(false);
    const [registerP, setRegisterP] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState([]);
    const [paymentOption, setPaymentOption] = useState([]);
    const [file, setFile] = useState(null);
    const [openSnack3, setOpenSnack3] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack3(false);
    };


    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const deliveryOptions = [
        'Delivery',
        'Pick Up'
    ];

    const paymentOptions = [
        'Cash On Delivery',
        'Credit Card'
    ];


    const SignUpBuyerSchema = Yup.object({
        email: Yup.string().email("Email must be valid").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
    });

    const handleSignUpBuyerSubmit = async (values) => {
        // setLoading(true)
        console.log("valuesss submit", values)
        let email = values.email;
        email = email.trim();
        email = email.charAt(0).toLowerCase() + email.slice(1);
        const form = {
            email: email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber
        }
        console.log("form", form);

        try {
            const success = await signUpBuyer(form);
            console.log("succ", success);
            if (success.status == 201) {
                setOpenSnack3(true);
                setTimeout(() => {
                    navigate("/auth/login");
                }, 2000)
            }
        }
        catch (error) {
            console.log("error", error);
        }

    };

    const formikBuyer = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: ''
        },
        validationSchema: SignUpBuyerSchema,
        onSubmit: (values) => {
            console.log("values", values);
            handleSignUpBuyerSubmit(values)
        }
    });

    const SignUpPharmacySchema = Yup.object({
        email: Yup.string().email("Email must be valid").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        pharmacyName: Yup.string().required("Pharmacy Name is required"),
        city: Yup.string().required("City is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        registrationYear: Yup.string().required("Registration Year is required"),
        deliveryOption: Yup.string().required("Delivery Option is required"),
        paymentOption: Yup.string().required("Payment Option is required"),
        // pharmacyLicense: Yup.string().required("Pharmacy License is required"),
    });

    const handleSignUpPharmacySubmit = async (values) => {
        // setLoading(true)
        console.log("valuesss submit", values)
        let email = values.email;
        email = email.trim();
        email = email.charAt(0).toLowerCase() + email.slice(1);
        const form = {
            email: email,
            password: values.password,
            pharmacyName: values.pharmacyName,
            city: values.city,
            phoneNumber: values.phoneNumber,
            registrationYear: values.registrationYear,
            deliveryOption: values.deliveryOption,
            paymentOption: values.paymentOption,
            // pharmacyLicense: values.pharmacyLicense
        }
        console.log("form", form);

        // try {
        //     const success = await signUpPharmacy(form);
        //     console.log("succ",success);
        //     if (success.data.result == true) {
        //         navigate("/home");
        //     }
        // }
        // catch (error) {
        //     console.log("error", error);
        // }

    };

    const formikPharmacy = useFormik({
        initialValues: {
            email: '',
            password: '',
            pharmacyName: '',
            city: '',
            phoneNumber: '',
            registrationYear: '',
            deliveryOption: deliveryOption,
            paymentOption: paymentOption,
            // pharmacyLicense: ''
        },
        validationSchema: SignUpPharmacySchema,
        onSubmit: (values) => {
            console.log("values", values);
            handleSignUpPharmacySubmit(values)
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

    const handleDeliveryOptionChange = (event) => {
        const {
            target: { value },
        } = event;
        setDeliveryOption(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handlePaymentOptionChange = (event) => {
        const {
            target: { value },
        } = event;
        setPaymentOption(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleLicenseChange = e => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };


    return (
        <div className="container">

            {
                registerB ?
                    (
                        <Card sx={{ display: 'flex', width: '60%', height: '60%', flexDirection: 'column' }}>
                            <div className="bgPic">
                                <Typography component="div" variant="h5" sx={{ marginTop: '20px' }}>
                                    Buyer Registration
                                </Typography>

                                <form onSubmit={formikBuyer.handleSubmit}>
                                    <Grid container md={12} sm={12} xs={12}>

                                        <Grid item md={6} sm={6} xs={12}>

                                            <div>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="First Name"
                                                    type={'text'}
                                                    name="firstName"
                                                    value={formikBuyer.values.firstName}
                                                    onChange={formikBuyer.handleChange}
                                                    onBlur={formikBuyer.handleBlur}
                                                    placeholder="Enter Your First Name"
                                                    sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                                />
                                                {formikBuyer.touched.firstName && formikBuyer.errors.firstName ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formikBuyer.errors.firstName}</div></span> : null}
                                            </div>
                                            <div>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Last Name"
                                                    type={'text'}
                                                    name="lastName"
                                                    value={formikBuyer.values.lastName}
                                                    onChange={formikBuyer.handleChange}
                                                    onBlur={formikBuyer.handleBlur}
                                                    placeholder="Enter Your Last Name"
                                                    sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                                />
                                                {formikBuyer.touched.lastName && formikBuyer.errors.lastName ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formikBuyer.errors.lastName}</div></span> : null}
                                            </div>
                                            <div>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Phone Number"
                                                    type={'number'}
                                                    name="phoneNumber"
                                                    value={formikBuyer.values.phoneNumber}
                                                    onChange={formikBuyer.handleChange}
                                                    onBlur={formikBuyer.handleBlur}
                                                    placeholder="Enter Your Phone Number"
                                                    sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                                />
                                                {formikBuyer.touched.phoneNumber && formikBuyer.errors.phoneNumber ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formikBuyer.errors.phoneNumber}</div></span> : null}
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
                                                        value={formikBuyer.values.email}
                                                        onChange={formikBuyer.handleChange}
                                                        onBlur={formikBuyer.handleBlur}
                                                        placeholder="Enter Your Email"
                                                        sx={{ width: '80%', marginBottom: '10px' }}
                                                    />
                                                    {formikBuyer.touched.email && formikBuyer.errors.email ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formikBuyer.errors.email}</div></span> : null}
                                                </div>
                                                <div>
                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        value={formikBuyer.values.password}
                                                        onChange={formikBuyer.handleChange}
                                                        onBlur={formikBuyer.handleBlur}
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
                                                    {formikBuyer.touched.password && formikBuyer.errors.password ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formikBuyer.errors.password}</div></span> : null}
                                                </div>
                                                <div>
                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Confirm Password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="confirmPassword"
                                                        value={formikBuyer.values.confirmPassword}
                                                        onChange={formikBuyer.handleChange}
                                                        onBlur={formikBuyer.handleBlur}
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
                                                    {formikBuyer.touched.confirmPassword && formikBuyer.errors.confirmPassword ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formikBuyer.errors.confirmPassword}</div></span> : null}
                                                </div>

                                            </CardContent>
                                        </Grid>
                                    </Grid>

                                    <Button type="submit" variant="contained" sx={{ width: '70%', marginTop: '20px', backgroundColor: '#00B8B0' }} className="btnAdd" >Sign Up</Button>

                                </form>
                                <a style={{ cursor: 'pointer', marginRight: '50px', float: 'right', marginTop: '20px', color: '#F8AF86', marginBottom: '20px' }} onClick={goToLogin}>Already have an account?</a>
                            </div>
                            <Snackbar open={openSnack3} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%', backgroundColor: '#019890' }}>
                                    User registered successfully !
                                </Alert>
                            </Snackbar>

                        </Card>
                    ) :
                    registerP ? (
                        <PharmacyRegistration />
                    ) :
                        (
                            <Card sx={{ display: 'flex', width: '60%', height: '60%', flexDirection: 'column' }}>
                                <Grid container md={12} sm={12} xs={12}>
                                    <Grid item md={6} sm={6} xs={12}>
                                        <Box sx={{ display: 'flex', marginTop: '30px' }}>
                                            <form>
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
                                                                    <Button type="submit" variant="contained" className="btnAdd" sx={{ width: '70%', marginTop: '20px', backgroundColor: '#00B8B0' }} onClick={registerBuyer}>Buyer</Button>
                                                                </Grid>
                                                                <Grid item md={6} sm={6} xs={12}>
                                                                    <Button type="submit" variant="contained" className="btnAdd" sx={{ width: '70%', marginTop: '20px', backgroundColor: '#00B8B0' }} onClick={registerPharmacy}>Pharmacy</Button>
                                                                </Grid>
                                                            </Grid>
                                                            <a style={{ cursor: 'pointer', marginLeft: '200px', color: '#F8AF86', marginBottom: '20px' }} onClick={goToLogin}>Already have an account?</a>

                                                        </CardContent>
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} sm={6} xs={12}>
                                        <CardMedia
                                            component="img"
                                            sx={{ maxWidth: '100%', height: '100%', objectFit: 'contain' }}
                                            image={signUpImg}
                                            alt="Live from space album cover"
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        )
            }
        </div>
    );
};

export default SignUp;
