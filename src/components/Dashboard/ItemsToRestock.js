import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title.js';
import { useEffect, useState } from "react";
import { getLoggedPharmacyOrders, getPharmacyProducts } from "../../api/index";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router';

function preventDefault(event) {
    event.preventDefault();
}

export default function ItemsToRestock() {
    const [products, setProducts] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    useEffect(async () => {
        const res = await getPharmacyProducts(loggedUser._id);
        if (res.status == 200) {
            setProducts(res.data)
        }
    }, []);
    console.log("productss", products)

    return (
        <React.Fragment >
            <Title>Drugs to Restock</Title>
            <ul>
                {
                    products?.data?.map(product => {
                        if (product.stock < 30) {
                            return (
                                <li>
                                    <Typography component="p" variant="h6" sx={{color: '#003633'}}>
                                        {product.productName}
                                    </Typography>
                                </li>

                            )
                        }
                    })
                }
            </ul>
        </React.Fragment>

    );
}