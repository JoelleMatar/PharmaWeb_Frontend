import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { createRefillLog, getPharmacyProducts, updateCheckoutStatus } from '../../api';
import { useState, useEffect } from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./PharmacyLogs.css";
import { useFormik, } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RefillStockDialog({ open, close, }) {
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
        const res = await getPharmacyProducts(loggedUser._id);

        setProducts(res?.data?.data)
    }, [])
    console.log("products", products)

    const handleProductChange = (event, value) => {
        console.log("value", value);
        setProductSel(value.productName);

        setSelectedProduct(value);
    };

    const refillStockSchema = Yup.object({
        stock: Yup.string().required("Stock is required"),
    });

    const formik = useFormik({
        initialValues: {
            supplierName: '',
            stock: 0,
        },
        validationSchema: refillStockSchema,
        onSubmit: (values) => {
            console.log("VALUES SUBMIT", values);
            handleRefillStockSubmit(values)
        }
    });

    const handleRefillStockSubmit = async (values) => {
        // setLoading(true)
        console.log("valuesss submit", values)

        const form = {
            supplierName: values.supplierName,
            stock: values.stock,
        }

        if (productSel === '') return alert("Please select product name");


        form.productName = productSel;
        form.pharmaId = loggedUser._id;
        console.log("HELLLLLLOOOOOOOOOOOOOOOOOOOOOOO", form);

        try {
            const success = await createRefillLog(selectedProduct._id, form);
            console.log("succ", success);
            if (success.status === 201) {

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
            >
                <form onSubmit={formik.handleSubmit} >
                    <DialogTitle id="responsive-dialog-title">
                        {"Refill Product Stock"}
                    </DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <DialogContentText>
                            <Autocomplete
                                required
                                id="tags-outlined"
                                sx={{ marginTop: '20px', marginBottom: '15px' }}
                                options={products}
                                onChange={(event, value) => handleProductChange(event, value)}
                                getOptionLabel={(prod) => prod.productName}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Product Name"
                                        placeholder="Product Name"
                                        name="productName"
                                        value={productSel}
                                        key={params._id}
                                    />
                                )}
                            />

                            <TextField
                                id="outlined-required"
                                label="Supplier Name"
                                type={'text'}
                                name="supplierName"
                                value={formik.values.supplierName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter Supplier Name"
                                // className="price"
                                sx={{ marginBottom: '15px', width: '100%' }}
                            />

                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="New Stock"
                                    type={'number'}
                                    name="stock"
                                    value={formik.values.stock}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter New Stock"
                                    // className="price"
                                    sx={{ marginBottom: '10px', width: '100%' }}
                                />
                                {formik.touched.stock && formik.errors.stock ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.stock}</div></span> : null}

                            </div>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={close} sx={{ color: '#ffa26c' }}>
                            Cancel
                        </Button>
                        <Button type='submit' autoFocus className="refill" sx={{ backgroundColor: '#00B8B0', color: 'white', marginRight: '18px', marginBottom: '10px' }}>
                            Refill
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%', backgroundColor: '#019890' }}>
                    Refill Stock for Product {selectedProduct.productName} was successful!
                </Alert>
            </Snackbar>
        </div >
    );
}
