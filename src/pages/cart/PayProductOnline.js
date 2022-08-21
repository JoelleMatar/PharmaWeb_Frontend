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
import {useLocation} from 'react-router-dom';

const PayProductOnline = () => {
    const [cart, setCart] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem("profile"));

    const location = useLocation();

    console.log("location.", location)
    return (
        <>
            <Navbar />

        </>

    )
}

export default PayProductOnline