import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import { mainListItems, } from './listItems';
import MainListItems from "./listItems";
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import "./styles.css";
import { useEffect } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import LayersIcon from '@mui/icons-material/Layers';
import { Button, ListItem } from '@mui/material';
import { useState } from "react";
import PharmacyProducts from '../pharmacy/pharmcyProducts.js/PharmacyProducts';
import AddProduct from '../pharmacy/addProduct/AddProduct';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',

                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex', marginTop: '80px' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open} sx={{ marginTop: '80px' }}>
                <Divider />

                <MainListItems />

                {/* <Divider />
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                        marginTop: '160px'
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar> */}
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    paddingLeft: "250px"
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Chart />
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Deposits />
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Orders />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </Box>

    );
}

function ProductsContent() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const addProduct = () => {
        console.log("add product");
        window.location.href = "http://localhost:3000/pharmacy/add-product"
    };

    return (
        <Box sx={{ display: 'flex', marginTop: '80px' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open} sx={{ marginTop: '80px', display: 'block' }}>
                <Divider />

                <MainListItems />

                {/* <Divider />
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                        marginTop: '160px'
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar> */}
            </Drawer>

            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    paddingLeft: "250px",
                    overflowY: 'scroll',
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, fontSize: "64px" }}>
                    <Grid container spacing={3}>
                        <Grid item md={12} sm={12} xs={12}>
                            <Button variant="contained" className='btnAdd' sx={{ marginRight: '0', float: 'right', marginBottom: '20px', backgroundColor: '#00B8B0',  }} color="primary" onClick={addProduct}>Add Product</Button>
                        </Grid>

                        <PharmacyProducts />
                    </Grid>
                </Container>
            </Box>
        </Box>

    );
}

function AddProductContent() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const addProduct = () => {
        console.log("add product")
    };

    return (
        <Box sx={{ display: 'flex', marginTop: '80px' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open} sx={{ marginTop: '80px', display: 'block' }}>
                <Divider />

                <MainListItems />

                {/* <Divider />
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                        marginTop: '160px'
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar> */}
            </Drawer>

            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    // height: '100vh',
                    paddingLeft: "250px"
                    // overflow: 'auto',
                }}
            >
                <Container  sx={{ mt: 4, mb: 4, height: ''}}>
                    <AddProduct />
                </Container>
            </Box>
        </Box>

    );
}

export default function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            {
                window.location.href === "http://localhost:3000/pharmacy/dashboard" ? <DashboardContent /> :
                    window.location.href === "http://localhost:3000/pharmacy/products" ? <ProductsContent /> :
                        window.location.href === "http://localhost:3000/pharmacy/add-product" ? <AddProductContent /> :
                            <DashboardContent />
            }
        </ThemeProvider>
    )
}