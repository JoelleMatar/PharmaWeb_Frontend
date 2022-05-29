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
import ShoppingCartItem from '../../components/shoppingCartItem/ShoppingCartItem';
import { getCustomerCart } from '../../api';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem("profile"));

    useEffect(async() => {
        const result = await getCustomerCart(loggedUser._id);
        setCart(result?.data?.data);
    }, []);

    console.log("cart", cart)

    return (
        <Grid container>
            <Navbar />

            {/* <CssBaseline /> */}
            <Container fixed sx={{width: '90%'}}>
                <Grid item md={12} sm={12} xs={12} sx={{ paddingTop: "120px", textAlign: 'left', marginLeft: '7%' }}>
                    <Typography variant="h3" sx={{ color: '#00B8B0', fontSize: '2.125rem', fontWeight: '400' }} gutterBottom>
                        Your Order
                    </Typography>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={7} lg={7}>
                        <Grid container>
                            <Grid item xs>
                                <ShoppingCartItem cart={cart} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5} lg={5}>
                        <OrderSummaryItem />
                    </Grid>
                </Grid>
            </Container>

        </Grid>

    )
}

export default Cart