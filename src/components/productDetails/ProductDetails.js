import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./ProductDetails.css";
import { useState, useEffect } from "react";
import Navbar from '../navbar/Navbar';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import { createCart, getProductDetails, getUser } from '../../api';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { QuantityPicker } from 'react-qty-picker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import RelatedProducts from './RelatedProducts';
import AppProducts from './RelatedProducts';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductDetails() {
    const [product, setProduct] = useState([]);
    const [pharmacy, setPharmacy] = useState([]);
    const productId = useParams();
    const [orderType, setOrderType] = useState("");
    const [qty, setQty] = useState(1);
    const [openSnack, setOpenSnack] = useState(false);
    const [openSnack2, setOpenSnack2] = useState(false);
    const [openSnack3, setOpenSnack3] = useState(false);
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
        setOpenSnack2(false);
        setOpenSnack3(false);

    };

    const handleChange = (event) => {
        setOrderType(event.target.value);
    };
    console.log("qty", qty, orderType)

    useEffect(async () => {
        const result = await getProductDetails(productId?.id);
        setProduct(result.data.data[0]);

        const result2 = await getUser(result.data.data[0].pharmaId);
        setPharmacy(result2?.data?.data[0]);

    }, [productId]);

    const loggedUser = JSON.parse(localStorage.getItem("profile"));

    console.log("logged", loggedUser)

    const addToCart = async () => {
        if (!loggedUser) {
            setOpenSnack2(true);
            setTimeout(() => {
                navigate("/auth/login")
            }, 2000)
        }
        const form = {
            productId: product._id,
            quantity: qty,
            customerId: loggedUser._id,
            deliverOption: orderType,
            prescription: '',
            pharmaId: product.pharmaId,
            pharmacyName: pharmacy.pharmacyName,
            pharmacyPaymentOptions: pharmacy.paymentOptions
        }
        console.log("form", form);

        try {
            const result = await createCart(form);
            console.log("result", result)
            if (result.status === 201) {
                setOpenSnack(true);
                setTimeout(() => {
                    navigate("/home/cart");
                }, 2000)

                localStorage.setItem("cartId", result?.data?._id);
            }
        }
        catch (error) {
            setOpenSnack3(true);
            console.log("error", error)
        }

    }

    return (
        <div>
            <Navbar />

            <Grid container sx={{ paddingTop: '90px', marginBottom: '30px' }}>
                <Grid item md={4} sm={4} xs={12}>
                    <div>
                        <CardMedia
                            component="img"
                            sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                            image={product.image}
                            alt={product.productName}
                        />
                    </div>
                </Grid>
                <Grid item md={8} sm={8} xs={12} sx={{ paddingTop: '60px', paddingLeft: '50px' }}>
                    <Typography component="div" variant="h3" sx={{ color: '#019890', marginBottom: '20px' }}  >
                        {product.productName}
                    </Typography>
                    <Typography component="div" variant="h5"  >
                        <b>{product.price} L.L. </b>from<b> {pharmacy.pharmacyName} {pharmacy.city}</b>
                    </Typography>
                    {/* <Grid container sx={{ marginTop: '10px' }}>
                        <Typography component="div" variant="h6"  >
                            {pharmacy.pharmacyName} is located in {pharmacy.city} and
                            {
                                pharmacy?.deliveryOptions?.length === 1 ?
                                    <span> has only {pharmacy?.deliveryOptions[0]} option</span>
                                    : <span> has pick up and delivery options</span>
                            }
                        </Typography>
                    </Grid> */}
                    <br />


                    <Typography component="div" variant="h6" sx={{ width: '90%' }} >
                        {product.description}
                    </Typography>

                    <Typography component="div" variant="h5" sx={{ color: '#ffa26c', marginTop: '20px' }}  >
                        <b>Product Information:</b>
                    </Typography>
                    <Grid container sx={{ paddingTop: '20px' }}>

                        <Box sx={{ width: '90%', marginBottom: '20px' }}>
                            <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>

                                <Typography component="div" variant="h6"  >
                                    Maximum Purchase Quantity: <span style={{ float: 'right' }}><b>{product.quantity}</b></span>
                                </Typography>
                                <Typography component="div" variant="h6"  >
                                    High Dose (Needs Prescription):
                                    <span style={{ float: 'right' }}>
                                        {
                                            product.category ? <p><b>Yes</b></p> : <p><b>No</b></p>
                                        }
                                    </span>
                                </Typography>
                                <Typography component="div" variant="h6"  >
                                    Form:
                                    <span style={{ float: 'right' }}>
                                        {
                                            product?.form?.length === 1 ?
                                                product?.form?.map(form => {
                                                    return <p><b>{form}</b></p>
                                                })
                                                : <p>
                                                    <b>
                                                        {product?.form?.map(form => {
                                                            return form + " - "
                                                        })}
                                                    </b>
                                                </p>
                                        }
                                    </span>
                                </Typography>
                                <Typography component="div" variant="h6"  >
                                    Dosage: <span style={{ float: 'right' }}>
                                        {
                                            product?.dosage?.length === 0 ? <span><b>No Dosage</b></span> :
                                                product?.dosage?.length === 1 ?
                                                    product?.dosage?.map(dosage => {
                                                        return <p key={dosage}><b>{dosage}</b></p>
                                                    })
                                                    : <p>
                                                        <b>
                                                            {product?.dosage?.map(dosage => {
                                                                return dosage + " - "
                                                            })}
                                                        </b>
                                                    </p>
                                        }
                                    </span>
                                </Typography>
                                <Typography component="div" variant="h6" sx={{ marginBottom: '20px' }} >
                                    Ingredients: <span style={{ float: 'right' }}>
                                        {
                                            product?.ingredient?.length === 1 ?
                                                product?.ingredient?.map(ingredient => {
                                                    return <Chip key={ingredient} label={ingredient} variant="outlined" />
                                                })
                                                :
                                                product?.ingredient?.map(ingredient => {
                                                    return <Chip label={ingredient} key={ingredient} variant="outlined" sx={{ marginLeft: '5px' }} />

                                                })
                                        }
                                    </span>
                                </Typography>

                                <FormControl sx={{ minWidth: 250, height: 100 }}>
                                    <InputLabel id="demo-select-small">Order Type</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={orderType}
                                        label="Order Type"
                                        onChange={handleChange}
                                    >
                                        {
                                            pharmacy?.deliveryOptions?.map(option => {
                                                return (
                                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                                )
                                            })

                                        }
                                    </Select>
                                </FormControl>
                                <QuantityPicker value={1} min={1} max={product?.quantity} onChange={(value) => { setQty(value) }} />


                                <br />
                                <Button variant="contained" className='btnAdd' sx={{ width: '50%', height: '50px', marginBottom: '20px', float: 'right', backgroundColor: '#00B8B0', }} onClick={() => addToCart()} >Add To Cart</Button>
                            </Paper>
                        </Box>
                    </Grid>
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', backgroundColor: '#019890' }}>
                            Added to cart successfully!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openSnack2} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%', backgroundColor: '#ffa26c' }}>
                            You should be logged in to add to cart!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openSnack3} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%', backgroundColor: '#ffa26c' }}>
                            You already have this product in your cart!
                        </Alert>
                    </Snackbar>

                </Grid>
            </Grid>

{
    console.log("productid", productId)
}
            <Grid>
                <AppProducts item={product} />
            </Grid>
        </div>
    );
}