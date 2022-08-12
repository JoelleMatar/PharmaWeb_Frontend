import React, { useState, } from "react";
import "./DonateMedication.css";
import Navbar from "../../components/navbar/Navbar";
import Grid from "@mui/material/Grid";
import donateD from "../../assets/donate.jpg";
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { donateDrug } from "../../api";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import Footer from "../../components/footer/Footer";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DonateMedication = () => {
    const [openSnack, setOpenSnack] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const donateDrugSchema = Yup.object({
        productName: Yup.string().required("Product(s) Name is required"),
        email: Yup.string().required("Email is required").email(),
        phone: Yup.string().required("Phone Number is required"),
        fullName: Yup.string().required("Full Name is required")
    });

    const handleDonateDrugSubmit = async (values) => {
        // setLoading(true)
        console.log("valuesss submit", values)

        const form = {
            fullName: values.fullName,
            productName: values.productName,
            email: values.email,
            phone: values.phone,
            message: values.message,
        }
        console.log("form", form);

        try {
            const success = await donateDrug(form);
            console.log("succ", success);
            if (success.status === 201) {
                setOpenSnack(true);
            }
        }
        catch (error) {
            console.log("error", error);
        }

    };

    const formik = useFormik({
        initialValues: {
            productName: '',
            fullname: '',
            phone: '',
            message: '',
            email: ''
        },
        validationSchema: donateDrugSchema,
        onSubmit: (values) => {
            console.log("values", values);
            handleDonateDrugSubmit(values)
        }
    });

    return (
        <div >
            <Navbar />

            <Grid container sx={{marginBottom: '80px'}}>
                <Grid item md={6} sm={12} xs={12}>
                    <Typography className='text' variant="h5" gutterBottom component="div">Do you have medication that you don't need?</Typography>
                    <Typography className='text2' variant="h6" gutterBottom component="div">Kindly fill the form below to donate your medication to someone in need. People will be able to contact you via the entered email and phone number as all registered users will be notified of your donation.</Typography>

                    <form style={{ textAlign: 'center' }} onSubmit={formik.handleSubmit}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Your Full Name"
                            placeholder="Please Enter Your Full Name"
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={'text'}
                            sx={{ width: '80%', marginTop: '30px' }}
                        />
                        {formik.touched.fullName && formik.errors.fullName ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.fullName}</div></span> : null}
                        <TextField
                            required
                            id="outlined-required"
                            label="Phone Number"
                            placeholder="Please Enter Your Phone Number"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={'text'}
                            sx={{ width: '80%', marginTop: '30px' }}
                        />
                        {formik.touched.phone && formik.errors.phone ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.phone}</div></span> : null}
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            placeholder="Please Enter Your Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={'email'}
                            sx={{ width: '80%', marginTop: '30px' }}
                        />
                        {formik.touched.email && formik.errors.email ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.email}</div></span> : null}

                        <TextField
                            required
                            id="outlined-required"
                            label="Product(s) Name"
                            placeholder="Please Enter Product(s) Name"
                            name="productName"
                            value={formik.values.productName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ width: '80%', marginTop: '40px' }}
                        />
                        {formik.touched.productName && formik.errors.productName ? <span style={{ fontSize: '15px', }}>  <div style={{ color: 'red' }}>{formik.errors.productName}</div></span> : null}
                        <TextField
                            id="outlined-multiline-static"
                            label="Message"
                            multiline
                            rows={4}
                            placeholder="Please Enter Message"
                            name="message"
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ width: '80%', marginTop: '30px' }}
                        />
                        <Button type="submit" variant="contained" sx={{ width: '80%', height: '50px', backgroundColor: '#00B8B0', marginTop: '40px' }} className="button" >Send Notification</Button>
                    </form>
                </Grid>
                <Grid item md={6} sm={12} xs={12} sx={{marginTop: '80px'}}>
                    <img src={donateD} className="img" />
                </Grid>
            </Grid>
            <Footer />

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%', backgroundColor: '#019890' }}>
                   Notification sent Successfully! People will contact you soon
                </Alert>
            </Snackbar>

        </div>

    )
}

export default DonateMedication