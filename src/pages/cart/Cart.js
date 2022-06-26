import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Navbar from '../../components/navbar/Navbar';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import OrderSummaryItem from '../../components/orderSummaryItem/OrderSummaryItem';
// import ShoppingCartItem from '../../components/shoppingCartItem/ShoppingCartItem';
import ShoppingCartItem from '../../components/shoppingCartItem/ShoppingCartItem copy';

import { getCustomerCart, getCustomerCartUnconfirmed } from '../../api';
import Footer from '../../components/footer/Footer';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem("profile"));

    useEffect(async() => {
        const result = await getCustomerCartUnconfirmed(loggedUser._id);
        setCart(result?.data?.data);
    }, []);

    console.log("cart", cart)

    return (
        <>
            <Navbar />

            {/* <CssBaseline /> */}
            <Container fixed >
                <Grid item md={12} sm={12} xs={12} sx={{ paddingTop: "120px", textAlign: 'left', marginLeft: '7%' }}>
                    <Typography variant="h3" sx={{ color: '#00B8B0', fontSize: '2.125rem', fontWeight: '400' }} gutterBottom>
                        Your Order
                    </Typography>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8} md={8} lg={8}>
                        <Grid container>
                            <Grid item xs>
                                <ShoppingCartItem cart={cart} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <OrderSummaryItem cart={cart} />
                    </Grid>
                </Grid>
            </Container>
        </>

    )
}

export default Cart