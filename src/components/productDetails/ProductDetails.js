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
import { useParams } from 'react-router-dom';
import { getProductDetails, getUser } from '../../api';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

export default function ProductDetails() {
    const [product, setProduct] = useState([]);
    const [pharmacy, setPharmacy] = useState([]);
    const productId = useParams();

    console.log("prod id", productId);
    useEffect(async () => {
        const result = await getProductDetails(productId?.id);
        setProduct(result.data.data[0]);

        const result2 = await getUser(result.data.data[0].pharmaId);
        // const result2 = dispatch(getUser(product?.pharmaId))
        setPharmacy(result2?.data?.data[0]);

    }, [productId]);



    console.log("pharmacy id", JSON.parse(localStorage.getItem('profile')));
    return (
        <div>
            <Navbar />

            <Grid container sx={{ paddingTop: '90px' }}>
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
                        For <b>{product.price} L.L.</b> From {pharmacy.pharmacyName}
                    </Typography>
                    <Grid container sx={{ marginTop: '10px' }}>
                        <Typography component="div" variant="h6"  >
                            {pharmacy.pharmacyName} is located in {pharmacy.city} and
                            {
                                pharmacy?.deliveryOptions?.length === 1 ?
                                    <span> has only {pharmacy?.deliveryOptions[0]} option</span>
                                    : <span> has pick up and delivery options</span>
                            }
                        </Typography>
                    </Grid>
                    <br />

                    <Typography component="div" variant="h5" sx={{ color: '#ffa26c' }}  >
                        <b>Product Information:</b>
                    </Typography>
                    <Grid container sx={{ paddingTop: '20px' }}>

                        <Box sx={{ width: '90%' }}>
                            <Paper elevation={3} sx={{ padding: '30px' }}>
                                <Typography component="div" variant="h6"  >
                                    Description: <span style={{ float: 'right'}}><b>{product.description}</b></span>
                                </Typography>
                                <Typography component="div" variant="h6"  >
                                    Maximum Purchase Quantity: <span style={{ float: 'right' }}><b>{product.quantity}</b></span>
                                </Typography>
                                <Typography component="div" variant="h6"  >
                                    High Dose:
                                    <span style={{ float: 'right' }}>
                                        {
                                            product.highDose ? <p><b>Yes</b></p> : <p><b>No</b></p>
                                        }
                                    </span>
                                </Typography>
                                <Typography component="div" variant="h6"  >
                                    Forms:
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
                                <Typography component="div" variant="h6"  >
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



                            </Paper>
                        </Box>
                    </Grid>


                </Grid>
            </Grid>
        </div>
    );
}