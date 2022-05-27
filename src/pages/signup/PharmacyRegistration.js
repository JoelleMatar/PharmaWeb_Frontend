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
import { signUpPharmacy } from "../../api/index";
import { useNavigate } from "react-router";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const PharmacyRegistration = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerB, setRegisterB] = useState(false);
    const [registerP, setRegisterP] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState([]);
    const [paymentOption, setPaymentOption] = useState([]);
    const [file, setFile] = useState("");

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

    const SignUpPharmacySchema = Yup.object({
        email: Yup.string().email("Email must be valid").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        pharmacyName: Yup.string().required("Pharmacy Name is required"),
        city: Yup.string().required("City is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        registrationYear: Yup.string().required("Registration Year is required"),
        pharmacyLicense: Yup.string().required("Pharmacy License is required"),
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
            pharmacyLicense: values.pharmacyLicense
        }
        if(deliveryOption.length === 0) return alert("Please select delivery option");
        if(paymentOption.length === 0) return alert("Please select payment option");

        form.deliveryOptions = deliveryOption;
        form.paymentOptions = paymentOption;

        console.log("form", form);

        try {
            const success = await signUpPharmacy(form);
            console.log("succ",success);
            if (success.data.result.role === 1) {
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
            pharmacyName: '',
            city: '',
            phoneNumber: '',
            registrationYear: '',
            pharmacyLicense: ''
        },
        validationSchema: SignUpPharmacySchema,
        onSubmit: (values) => {
            console.log("values", values);
            handleSignUpPharmacySubmit(values)
        }
    });

    console.log("formik", formik);


    const handleDeliveryOptionChange = (event) => {
        const {
            target: { value },
        } = event;
        setDeliveryOption(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        
    };
console.log("deliveryOption", deliveryOption);
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
        console.log(e.target.files[0].name);
        setFile(e.target.files[0].name);
    };

    const goToLogin = () => {
        navigate('/auth/login')
    }

    return (
        <div className="container">

            <Card sx={{ display: 'flex', width: '60%', height: '85%', flexDirection: 'column', overflowY: 'scroll' }}>
                <div className="bgPic">
                    <Typography component="div" variant="h5" sx={{ marginTop: '20px' }}>
                        Pharmacy Registration
                    </Typography>

                    <form onSubmit={formik.handleSubmit}>
                        <Grid container md={12} sm={12} xs={12}>
                            <Grid item md={6} sm={6} xs={12}>
                                <div>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Pharmacy Name"
                                        type={'text'}
                                        name="pharmacyName"
                                        value={formik.values.pharmacyName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Pharmacy Name"
                                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                    />
                                    {formik.touched.pharmacyName && formik.errors.pharmacyName ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.pharmacyName}</div></span> : null}
                                </div>

                                <div>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="City"
                                        type={'text'}
                                        name="city"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter City"
                                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                    />
                                    {formik.touched.city && formik.errors.city ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.city}</div></span> : null}
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
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.phoneNumber}</div></span> : null}
                                </div>

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
                                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                    />
                                    {formik.touched.email && formik.errors.email ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.email}</div></span> : null}
                                </div>

                                <div>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Registration Year"
                                        type={'number'}
                                        name="registrationYear"
                                        value={formik.values.registrationYear}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Registration Year"
                                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                    />
                                    {formik.touched.registrationYear && formik.errors.registrationYear ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.registrationYear}</div></span> : null}
                                </div>
                            </Grid>
                            <Grid item md={6} sm={6} xs={12}>
                                <CardContent>
                                    <div>
                                        <FormControl sx={{ width: '80%', marginTop: '5px', marginBottom: '10px' }}>
                                            <InputLabel id="deliveryOption">Delivery Options</InputLabel>
                                            <Select
                                                labelId="deliveryOption-label"
                                                id="deliveryOptionID"
                                                multiple
                                                value={deliveryOption}
                                                onChange={handleDeliveryOptionChange}
                                                input={<OutlinedInput label="Delivery Options" />}
                                                renderValue={(selected) => selected.join(', ')}
                                            >
                                                {deliveryOptions.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        <Checkbox checked={deliveryOption.indexOf(option) > -1} />
                                                        <ListItemText primary={option} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div>
                                        <FormControl sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}>
                                            <InputLabel id="paymentOption">Payment Options</InputLabel>
                                            <Select
                                                labelId="paymentOption-label"
                                                id="paymentOptionID"
                                                multiple
                                                value={paymentOption}
                                                onChange={handlePaymentOptionChange}
                                                input={<OutlinedInput label="Payment Options" />}
                                                renderValue={(selected) => selected.join(', ')}
                                            >
                                                {paymentOptions.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        <Checkbox checked={paymentOption.indexOf(option) > -1} />
                                                        <ListItemText primary={option} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
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

                                    <div>
                                        <label for="file-upload" className="custom-file-upload" >
                                            <DriveFolderUploadIcon sx={{ marginTop: "5px" }} /> Upload Pharmacy License
                                        </label>
                                        <input id="file-upload" name="pharmacyLicense" type="file" onChange={formik.handleChange} value={formik.values.pharmacyLicense} />
                                    </div>

                                </CardContent>
                            </Grid>
                        </Grid>

                        <Button type="submit" variant="contained" sx={{ width: '70%', marginTop: '20px', backgroundColor: '#00B8B0' }} className="button" >Sign Up</Button>

                    </form>
                    <a style={{ cursor: 'pointer', marginRight: '50px', float: 'right', marginTop: '20px', color: '#F8AF86' }} onClick={goToLogin}>Already have an account?</a>
                </div>
            </Card>
        </div>
    );
};

export default PharmacyRegistration;
