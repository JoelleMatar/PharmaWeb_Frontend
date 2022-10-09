import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// import { createRefillLog, getPharmacyProducts, updateCheckoutStatus } from '../../api';
import { useState, useEffect } from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormik, } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getProductDetails, updateProductDetails } from '../../../api';
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PharmacyProductDetails({ open, close, product }) {
    const navigate = useNavigate();

    const [OpenDialog, setOpenDialog] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [productSel, setProductSel] = useState("");
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem('profile'));
    const [openSnack, setOpenSnack] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    useEffect(async () => {
        const res = await getProductDetails(product?._id)

        setSelectedProduct(res?.data?.data[0])
    }, [])
    console.log("products", selectedProduct)


    const formik = useFormik({
        initialValues: {
            price: product.price,
            description: product.description,
            quantity: product.quantity
        },
        onSubmit: (values) => {
            console.log("VALUES SUBMIT", values);
            handleProductDetailSubmit(values)
        }
    });

    const handleProductDetailSubmit = async (values) => {
        // setLoading(true)
        console.log("valuesss submit", values)

        const form = {
            price: values.price,
            description: values.description,
            quantity: values.quantity
        }

        console.log("HELLLLLLOOOOOOOOOOOOOOOOOOOOOOO", form);

        try {
            const res = await updateProductDetails(product._id, form);
            console.log("succ", res);
            if (res.status === 200) {

                setOpenSnack(true);
                setTimeout(() => {
                    window.location.reload()
                }, 2000)

            }
        }
        catch (error) {
            console.log("error", error);
        }

    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={close}
                aria-labelledby="responsive-dialog-title"
                fullWidth
                maxWidth="md"
            >
                <form onSubmit={formik.handleSubmit} >
                    <DialogTitle id="responsive-dialog-title">
                        {"Product Details"}
                    </DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <DialogContentText>
                            <Grid container sx={{ textAlign: 'center' }}>
                                <Grid item md={6} sm={6} xs={12} sx={{ textAlign: 'center' }}>
                                    <div>
                                        <TextField
                                            id="outlined-read-only-input"
                                            sx={{ width: '95%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                            label="Product Name"
                                            value={product.productName}
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Grid container>
                                            <Grid item md={6} sm={6} xs={6}>
                                                <TextField
                                                    id="outlined-read-only-input"
                                                    sx={{ width: '95%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                                    label="Laboratory Name"
                                                    value={product.laboratory}
                                                    InputLabelProps={{ shrink: true }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={6} sm={6} xs={6}>
                                                <TextField
                                                    id="outlined-read-only-input"
                                                    sx={{ width: '90%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                                    label="Country of Origin"
                                                    value={product.country}
                                                    InputLabelProps={{ shrink: true }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>


                                    </div>

                                    <div>
                                        <Grid container>
                                            <Grid item md={4} sm={4} xs={6}>
                                                <TextField
                                                    id="outlined-read-only-input"
                                                    sx={{ width: '90%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                                    label="Dosage"
                                                    value={product.dosage}
                                                    InputLabelProps={{ shrink: true }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={8} sm={8} xs={6}>
                                                <TextField
                                                    id="outlined-read-only-input"
                                                    sx={{ width: '93%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                                    label="Form"
                                                    value={product.form}
                                                    InputLabelProps={{ shrink: true }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                    </div>
                                    <div>

                                        <Autocomplete
                                            multiple
                                            id="tags-readOnly"
                                            sx={{ width: '95%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                            options={product.ingredient}
                                            value={product.ingredient}
                                            readOnly
                                            renderInput={(params) => (
                                                <TextField {...params} InputLabelProps={{ shrink: true }} label="Ingredients" />
                                            )}
                                        />

                                    </div>

                                </Grid>
                                <Grid item md={6} sm={6} xs={12}>
                                    <Grid container>
                                        <Grid item md={6} sm={6} xs={6}>
                                            <div>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Price"
                                                    type={'number'}
                                                    name="price"
                                                    InputLabelProps={{ shrink: true }}
                                                    defaultValue={product.price}
                                                    value={formik.values.price}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter Product Price"
                                                    sx={{ width: '80%', marginTop: '20px', marginBottom: '10px', marginLeft: '40px' }}
                                                />
                                                {formik.touched.price && formik.errors.price ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.price}</div></span> : null}
                                            </div>
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={6}>
                                            <div style={{ width: '80%', marginTop: '10px', marginBottom: '40px', fontSize: '18px', marginLeft: '20px' }}>
                                                <span>High Dose</span>
                                                <Switch name="category" disabled defaultChecked={product.category} />
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <div>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Stock"
                                            type={'number'}
                                            name="stock"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                            value={product.stock}
                                            className="price"
                                            sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Quantity"
                                            type={'number'}
                                            name="quantity"
                                            className="qty"
                                            InputLabelProps={{ shrink: true }}
                                            defaultValue={product.quantity}
                                            value={formik.values.quantity}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                        />
                                        {formik.touched.quantity && formik.errors.quantity ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.quantity}</div></span> : null}
                                    </div>
                                    <div>
                                        <TextField
                                            id="outlined-required"
                                            multiline
                                            rows={4}
                                            label="Description"
                                            type={'multiline'}
                                            name="description"
                                            className="Description"
                                            InputLabelProps={{ shrink: true }}
                                            defaultValue={product.description}
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter description"
                                            sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={close} sx={{ color: '#ffa26c', marginBottom: '10px' }}>
                            Cancel
                        </Button>
                        <Button type='submit' autoFocus className="refill" sx={{ backgroundColor: '#00B8B0', color: 'white', marginRight: '18px', marginBottom: '10px' }}>
                            Edit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%', backgroundColor: '#019890' }}>
                    Product {product.productName} was updated successfully!
                </Alert>
            </Snackbar>
        </div >
    );
}
