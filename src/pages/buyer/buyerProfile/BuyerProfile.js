import Navbar from "../../../components/navbar/Navbar"
import "./BuyerProfile.css"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router";

import EditIcon from '@mui/icons-material/Edit';
import { updatePharmacy, getUser } from '../../../api/index';

const BuyerProfile = () => {
    const loggedUser = JSON.parse(localStorage.getItem("profile"));
    const [user, setUser] = useState([]);
    const [edit, setEdit] = useState(false);

    useEffect(async () => {
        const result = await getUser(loggedUser._id);

        setUser(result.data.data[0]);
    }, [])

    console.log("USERRRR", user);

    const navigate = useNavigate();
    const [deliveryOption, setDeliveryOption] = useState([]);
    const [paymentOption, setPaymentOption] = useState([]);

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const SignUpBuyerSchema = Yup.object({
        email: Yup.string().email("Email must be valid").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
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
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
        }

        console.log("form", form);

        try {
            const success = await updatePharmacy(form, loggedUser._id);
            console.log("succ", success);
            if (success.status === 201) {
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
            firstName: loggedUser.firstName,
            lastName: loggedUser.lastName,
            phoneNumber: loggedUser.phoneNumber,
        },
        validationSchema: SignUpBuyerSchema,
        onSubmit: (values) => {
            console.log("values", values);
            handleUpdateSubmit(values)
        }
    });

    console.log("formik", formik);



    const editProfile = () => {
        setEdit(true)
        console.log("edit")
    }

    return (
        <div style={{ overflowY: 'hidden' }}>
            {/* <div>PharmacyDashboard</div> */}
            <Navbar />

            <Grid container sx={{ height: '90%', marginTop: '120px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Card sx={{ display: 'flex', paddingTop: '10px', width: '40%', height: '100%', flexDirection: 'column' }}>
                    <div className="bgPic">
                        {
                            edit && user ? (
                                <form onSubmit={formik.handleSubmit} style={{ textAlign: 'center' }}>
                                    <Typography component="div" variant="h5" sx={{ margin: '20px 0 10px 60px', color: '#00a49c', textAlign: 'left' }}>
                                        Your Profile
                                    </Typography>


                                    <Grid container md={12} sm={12} xs={12}>
                                        <Grid item md={12} sm={12} xs={12}>
                                            <div>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="First Name"
                                                    type={'text'}
                                                    name="firstName"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={formik.values.firstName || user.firstName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter First Name"
                                                    sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                                />
                                                {formik.touched.firstName && formik.errors.firstName ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.firstName}</div></span> : null}
                                            </div>

                                            <div>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Last Name"
                                                    type={'text'}
                                                    name="lastName"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={formik.values.lastName || user.lastName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter Last Name"
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
                                        <Grid item md={12} sm={12} xs={12}>
                                            <div>
                                                <TextField
                                                    id="filled-read-only-input"
                                                    label="First Name"
                                                    value={user.firstName}
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
                                                    label="Last Name"
                                                    value={user?.lastName}
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

                                        </Grid>
                                    </Grid>

                                </div>
                            )
                        }

                    </div>
                </Card>

            </Grid>

        </div>
    )
}

export default BuyerProfile