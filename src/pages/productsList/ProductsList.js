import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import HomePharmacyCard from '../../components/pharmacy/homePharmacyCard/HomePharmacyCard';
import { getProducts, getProductsAscending, getProductsAscendingbySearch, getProductsDescendingbySearch, getProductsbySearch, getProductsDescending, getProductsHighPricebySearch, getProductsLowPricebySearch, getProductsLowPrice, getProductsHighPrice } from '../../api';
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Navbar from '../../components/navbar/Navbar';
import HomeProductCard from '../../components/pharmacy/homeProductCard/HomeProductCard';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import FilterListIcon from '@mui/icons-material/FilterList';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [state, setState] = useState('');
    const [open, setOpen] = React.useState(false);
    const prevOpen = React.useRef(open);
    const anchorRef = React.useRef(null);


    const handleSearch = (value) => {
        setState(value);
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    useEffect(async () => {
        const products = state !== '' ? await getProductsbySearch(state) : await getProducts();

        setProducts(products.data.data);

        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [state, open]);

    console.log("products", products)



    const filterAZ = async() => {
        const res = state !== '' ?  await getProductsAscendingbySearch(state) : await getProductsAscending();
        console.log("prodyctsss", res)
        setProducts(res.data.data)
        handleClose()
    }
    const filterZA = async() => {
        const res = state !== '' ?  await getProductsDescendingbySearch(state) : await getProductsDescending();
        console.log("prodyctsss", res)
        setProducts(res.data.data)
        handleClose()
    }

    const filterLowtoHigh = async() => {
        const res = state !== '' ?  await getProductsLowPricebySearch(state) : await getProductsLowPrice();
        console.log("prodyctsss", res)
        setProducts(res.data.data)
        handleClose()
    }
    const filterHightoLow = async() => {
        const res = state !== '' ?  await getProductsHighPricebySearch(state) : await getProductsHighPrice();
        console.log("prodyctsss", res)
        setProducts(res.data.data)
        handleClose()
    }

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
                sx={{ width: '30%',  marginLeft: '60%' }}
                onChange={(e) => handleSearch(e.target.value)}
            >
                <SearchIcon />
            </TextField>

            {/* FilterList */}
            <Stack direction="row" spacing={2}>
                <div>
                    <Button
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <FilterListIcon sx={{ width: "1.5em", height: '1.5em' }} />
                    </Button>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem onClick={filterAZ}>Product Name (A - Z)</MenuItem>
                                            <MenuItem onClick={filterZA}>Product Name (Z -A)</MenuItem>
                                            <MenuItem onClick={filterLowtoHigh}>Product Price (Low to High)</MenuItem>
                                            <MenuItem onClick={filterHightoLow}>Product Price (High to Low)</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </Stack>

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

        </Grid>

    )
}

export default ProductsList