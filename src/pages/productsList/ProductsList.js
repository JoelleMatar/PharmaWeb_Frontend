import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import HomePharmacyCard from '../../components/pharmacy/homePharmacyCard/HomePharmacyCard';
import { getProducts, getProductsbySearch } from '../../api';
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Navbar from '../../components/navbar/Navbar';
import HomeProductCard from '../../components/pharmacy/homeProductCard/HomeProductCard';
import SearchIcon from '@mui/icons-material/Search';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [state, setState] = useState('');

    const handleSearch = (value) => {
        setState(value);
    }

    useEffect(async () => {
        const products = state !== '' ? await getProductsbySearch(state) : await getProducts();

        setProducts(products.data.data);
    }, [state]);

    console.log("products", products)

    return (
        <Grid container>
            <Navbar />
            <Grid item md={12} sm={12} xs={12} sx={{ paddingTop: "120px", textAlign: 'left', marginLeft: '7%' }}>
                <Typography variant="h4" sx={{ color: '#00B8B0', }} gutterBottom>
                    Products List
                </Typography>
            </Grid>
            <TextField
                id="outlined-required"
                label="Search by product name"
                defaultValue=''
                sx={{ width: '30%', marginLeft: '63%' }}
                onChange={(e) => handleSearch(e.target.value)}
            >
                <SearchIcon />
            </TextField>
            {/* 
            <Grid item>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}> */}
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={3} sx={{ paddingTop: '40px', marginLeft: '6%', marginRight: '6%' }}>
                {
                    products.map((product) => {
                        return (
                            <Grid item xs={12} sm={3} md={3} key={product._id}>
                                <HomeProductCard product={product} />
                            </Grid>
                        )

                    })
                }

            </Grid>
            {/* </Box>
            </Grid> */}

        </Grid>

    )
}

export default ProductsList