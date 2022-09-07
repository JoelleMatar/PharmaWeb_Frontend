import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUser } from "../../api/index";
import { useNavigate } from "react-router";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import { updatePharmacy } from '../../api/index';

export default function PharmacyProfile() {
    const loggedUser = JSON.parse(localStorage.getItem("profile"));
    const [user, setUser] = useState([]);
    const [edit, setEdit] = useState(false);

    useEffect(async () => {
        const result = await getUser(loggedUser._id);

        setUser(result.data.data[0]);
    }, [])

    console.log("USERRRR", user);

    const navigate = useNavigate();
    const [registerB, setRegisterB] = useState(false);
    const [registerP, setRegisterP] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState(loggedUser.deliveryOptions);
    const [paymentOption, setPaymentOption] = useState(loggedUser.paymentOptions);
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
        // pharmacyLicense: Yup.string().required("Pharmacy License is required"),
    });

    const handleUpdateSubmit = async (values) => {
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
            // pharmacyLicense: values.pharmacyLicense
        }
        if (deliveryOption.length === 0) return alert("Please select delivery option");
        if (paymentOption.length === 0) return alert("Please select payment option");

        form.deliveryOptions = deliveryOption;
        form.paymentOptions = paymentOption;

        console.log("form", form);

        try {
            loggedUser.deliveryOptions = form.deliveryOptions
            loggedUser.paymentOptions = form.paymentOptions
            localStorage.setItem('profile', JSON.stringify(loggedUser))
            const success = await updatePharmacy(form, loggedUser._id);
            console.log("succ", success);
            if(success.status === 201) {
            window.location.reload();
            }
        }
        catch (error) {
            console.log("error", error);
        }

    };

    const formik = useFormik({
        initialValues: {
            email: loggedUser.email,
            password: loggedUser.password,
            pharmacyName: loggedUser.pharmacyName,
            city: loggedUser.city,
            phoneNumber: loggedUser.phoneNumber,
            registrationYear: loggedUser.registrationYear,
            // pharmacyLicense: ''
        },
        validationSchema: SignUpPharmacySchema,
        onSubmit: (values) => {
            console.log("values", values);
            handleUpdateSubmit(values)
        }
    });

    console.log("formik", formik);


    const handleDeliveryOptionChange = (event) => {
        setDeliveryOption([])
        const {
            target: { value },
        } = event;
        setDeliveryOption(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    // loggedUser.deliveryOptions = deliveryOption
    console.log("deliveryOption", deliveryOption, loggedUser);
    const handlePaymentOptionChange = (event) => {
        const {
            target: { value },
        } = event;
        setPaymentOption(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const editProfile = () => {
        setEdit(true)
        console.log("edit")
    }

    return (
        <Grid container sx={{ height: '90%' }}>
            <Card sx={{ display: 'flex', marginLeft: '30px', paddingTop: '10px', width: '100%', height: '100%', flexDirection: 'column' }}>
                <div className="bgPic">
                    {
                        edit && user ? (
                            <form onSubmit={formik.handleSubmit} style={{ textAlign: 'center' }}>
                                <Typography component="div" variant="h5" sx={{ margin: '20px 0 10px 60px', color: '#00a49c', textAlign: 'left' }}>
                                    Your Profile
                                </Typography>


                                <Grid container md={12} sm={12} xs={12}>
                                    <Grid item md={6} sm={6} xs={12}>
                                        <div>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Pharmacy Name"
                                                type={'text'}
                                                name="pharmacyName"
                                                InputLabelProps={{ shrink: true }}
                                                value={formik.values.pharmacyName || user.pharmacyName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}

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
                                                InputLabelProps={{ shrink: true }}
                                                value={formik.values.city || user.city}
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
                                                InputLabelProps={{ shrink: true }}
                                                value={formik.values.phoneNumber || user.phoneNumber}
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
                                                InputLabelProps={{ shrink: true }}
                                                value={formik.values.email || user.email}
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
                                                InputLabelProps={{ shrink: true }}
                                                value={formik.values.registrationYear || user.registrationYear}
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
                                                                <Checkbox checked={deliveryOption.map(opt => opt).indexOf(option) > - 1} />
                                                                <ListItemText primary={option} />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <div>
                                                <FormControl sx={{ width: '80%', marginTop: '5px', marginBottom: '10px' }}>
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
                                                                <Checkbox checked={paymentOption?.map(opt => opt).indexOf(option) > - 1} />
                                                                <ListItemText primary={option} />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>

                                        </CardContent>
                                    </Grid>
                                </Grid>

                                <Button type="submit" variant="contained" sx={{ width: '50%', marginTop: '20px', backgroundColor: '#00B8B0', marginBottom: '30px', }} className="button"  >Update Profile</Button>



                            </form>
                        ) : (
                            <div style={{ paddingLeft: '100px' }}>
                                <Typography component="div" variant="h5" sx={{ marginTop: '20px', color: '#00a49c', marginBottom: '10px' }}>
                                    Your Profile <EditIcon sx={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => editProfile()} />
                                </Typography>


                                <Grid container md={12} sm={12} xs={12}>
                                    <Grid item md={6} sm={6} xs={12}>
                                        <div>
                                            <TextField
                                                id="filled-read-only-input"
                                                label="Pharmacy Name"
                                                value={user.pharmacyName}
                                                InputLabelProps={{ shrink: true }}
                                                // defaultValue={user.pharmacyName}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                            />
                                        </div>

                                        <div>
                                            <TextField
                                                id="filled-read-only-input"
                                                label="City"
                                                value={user?.city}
                                                InputLabelProps={{ shrink: true }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                            />
                                        </div>

                                        <div>
                                            <TextField
                                                id="filled-read-only-input"
                                                label="Phone Number"
                                                InputLabelProps={{ shrink: true }}
                                                value={user?.phoneNumber}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                            />
                                        </div>

                                        <div>
                                            <TextField
                                                id="filled-read-only-input"
                                                label="Email"
                                                value={user?.email}
                                                InputLabelProps={{ shrink: true }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                            />
                                        </div>

                                        <div>
                                            <TextField
                                                id="filled-read-only-input"
                                                label="Registration Year"
                                                InputLabelProps={{ shrink: true }}
                                                value={user?.registrationYear}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item md={6} sm={6} xs={12}>
                                        <CardContent>
                                            <div>
                                                <TextField
                                                    id="filled-read-only-input"
                                                    label="Delivery Options"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={user?.deliveryOptions?.map(option => option).join(', ')}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{ width: '80%', marginBottom: '10px' }}
                                                />
                                            </div>

                                            <div>
                                                <TextField
                                                    id="filled-read-only-input"
                                                    label="Payment Options"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={user?.paymentOptions?.map(option => option).join(', ')}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                                />
                                            </div>

                                        </CardContent>
                                    </Grid>
                                </Grid>

                            </div>
                        )
                    }

                </div>
            </Card>

        </Grid>

    );
}