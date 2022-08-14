import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title.js';
import { useEffect, useState } from "react";
import { getLoggedPharmacyOrders } from "../../api/index";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router';

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {
    const [orders, setOrders] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [pharmacySales, setPharmacySales] = useState(0);

    useEffect(async () => {
        const res = await getLoggedPharmacyOrders(loggedUser._id);
        if (res.status == 200) {
            // const orders = state !== '' ? await getLoggedPharmacyOrdersBySearch(loggedUser._id, state) : await getLoggedPharmacyOrders(loggedUser._id);

            setOrders(res.data)
        }
    }, []);

    var recentsales = 0;
    orders?.cartPharma?.slice(0, 7).map(order => {
        recentsales += order.totalPrice;
    })

    return (
        <React.Fragment>
            <Title>Weekly Sales</Title>
            <Typography component="p" variant="h4">
                {recentsales}L.L.
            </Typography>
        </React.Fragment>

    );
}