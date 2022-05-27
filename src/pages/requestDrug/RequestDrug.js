import React, { useState, } from "react";
import "./RequestDrug.css";
import Navbar from "../../components/navbar/Navbar";
import Grid from "@mui/material/Grid";
import requestD from "../../assets/request.jpg";
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { requestDrug } from "../../api";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RequestDrug = () => {
    const [openSnack, setOpenSnack] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const requestDrugSchema = Yup.object({
        productName: Yup.string().required("Product Name is required"),
        quantity: Yup.string().required("Quantity is required").min(1, "Quantity should at least be 1"),
    });

    const handleRequestDrugSubmit = async (values) => {
        // setLoading(true)
        console.log("valuesss submit", values)

        const form = {
            userId: JSON.parse(localStorage.getItem('profile'))._id,
            productName: values.productName,
            quantity: values.quantity,
            message: values.message,
        }
        console.log("form", form);

        try {
            const success = await requestDrug(form);
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
            quantity: '',
            message: ''
        },
        validationSchema: requestDrugSchema,
        onSubmit: (values) => {
            console.log("values", values);
            handleRequestDrugSubmit(values)
        }
    });

    return (
        <div >
            <Navbar />

            <Grid container>
                <Grid item md={6} sm={12} xs={12}>
                    <Typography className='text' variant="h5" gutterBottom component="div">Didn't find your Product?</Typography>
                    <Typography className='text2' variant="h6" gutterBottom component="div">Request a product by filling the form below. This will notify all the registered pharmacies that this item is in demand.</Typography>

                    <form style={{ textAlign: 'center' }} onSubmit={formik.handleSubmit}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Product Name"
                            placeholder="Please Enter Product Name"
                            name="productName"
                            value={formik.values.productName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ width: '80%', marginTop: '40px' }}
                        />
                        {formik.touched.productName && formik.errors.productName ? <span style={{ fontSize: '15px', }}>  <div style={{ color: 'red' }}>{formik.errors.productName}</div></span> : null}
                        <TextField
                            required
                            id="outlined-required"
                            label="Quantity Needed"
                            placeholder="Please Enter Quantity"
                            name="quantity"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={'number'}
                            sx={{ width: '80%', marginTop: '30px' }}
                        />
                        {formik.touched.quantity && formik.errors.quantity ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.quantity}</div></span> : null}
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
                        <Button type="submit" variant="contained" sx={{ width: '80%', height: '50px', backgroundColor: '#00B8B0', marginTop: '40px' }} className="button" >Request Drug</Button>
                    </form>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <img src={requestD} className="img" />
                </Grid>
            </Grid>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%', backgroundColor: '#019890' }}>
                    Product Requested Successfully!
                </Alert>
            </Snackbar>

        </div>

    )
}

export default RequestDrug