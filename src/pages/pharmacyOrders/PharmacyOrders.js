import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./PharmacyOrders.css";
import { getLoggedPharmacyOrders, updateOrderStatus } from '../../api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ViewPrescription from './ViewPrescription';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 100,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function PharmacyOrders() {
    const [orders, setOrders] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem('profile'));
    const [status, setStatus] = useState("");
    const [statusnbr, setStatusnbr] = useState(false);
    const [openpresc, setOpenpres] = React.useState(false);
    const [prescriptionImg, setprescriptionImg] = useState("");

    const handleClickOpen = (row) => {
        setprescriptionImg(row)
        setOpenpres(true);
    };

    const closeDialog = () => {
        setOpenpres(false);
    }
    const [idtest, setIdTest] = useState('')
    const statusChange = async (event, id) => {
        setStatusnbr(false)

        const data = {
            status: event
        }
        console.log("data", data.status, id)
        const changestatus = await updateOrderStatus(id, data);

        if (changestatus.data.order.modifiedCount === 1) {
            console.log("data", changestatus)
            window.location.reload()
        }
    };
    console.log("statusnbr", statusnbr)

    useEffect(async () => {
        const res = await getLoggedPharmacyOrders(loggedUser._id);
        if (res.status == 200) {
            // const orders = state !== '' ? await getLoggedPharmacyOrdersBySearch(loggedUser._id, state) : await getLoggedPharmacyOrders(loggedUser._id);

            setOrders(res.data)
        }


    }, [])


    console.log("res", orders)
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const [state, setState] = useState('');
    const handleSearch = (value) => {
        console.log("value", value)
        setState(value);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);


    const open = Boolean(anchorEl);
    
    const handleStatusChange = (event, id) => {
        console.log("moss", id)
        setAnchorEl(event.currentTarget);
        setIdTest(id)
    console.log("IDDDDDDDDD=>>>>>>>>", idtest)
    };



    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ width: '100%', marginLeft: '40px' }}>

            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    sx={{ backgroundColor: 'white', color: '#00B8B0' }}
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="All Orders" {...a11yProps(0)} />
                    <Tab label="Pending Orders" {...a11yProps(1)} />
                    <Tab label="Accepted Orders" {...a11yProps(2)} />
                    <Tab label="Delivered Orders" {...a11yProps(3)} />
                    <Tab label="Picked Up Orders" {...a11yProps(4)} />
                </Tabs>
            </AppBar>
            {/* <TextField
                id="outlined-required"
                label="Search by order or by customer"
                defaultValue=''
                sx={{ width: '40%', marginTop: '20px', paddingTop: '8px' }}
                onChange={(e) => handleSearch(e.target.value)}
            >
                <SearchIcon />
            </TextField> */}
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <TableContainer id='scroll-6' component={Paper} sx={{ overflowY: 'scroll', height: '450px' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order #</TableCell>
                                    <TableCell align="right">Customer</TableCell>
                                    <TableCell align="right">Order</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">View Prescription</TableCell>
                                    <TableCell align="right">Delivery Date</TableCell>
                                    <TableCell align="right">Delivery Type</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders?.cartPharma?.map((row, index) => {
                                    const datee = new Date(row.createdAt)
                                    // console.log("rpw", row)
                                    return (
                                        <>
                                            {
                                                orders?.products?.filter(prod => prod._id === row.productId).map(prod => {
                                                    // console.log("prodd", prod)
                                                    return (
                                                        <>
                                                            {
                                                                orders?.customers?.filter(customer => customer._id === row.customerId).map(customer => {
                                                                    // console.log("prodd", customer)
                                                                    return (
                                                                        <TableRow
                                                                            key={row._id}
                                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                        >
                                                                            <TableCell component="th" scope="row">
                                                                                {index + 1}
                                                                            </TableCell>
                                                                            <TableCell align="right">{customer?.firstName} {customer?.lastName} {customer?.pharmacyName} </TableCell>
                                                                            <TableCell align="right">{prod.productName}</TableCell>
                                                                            <TableCell align="right">{row.totalPrice}L.L.</TableCell>
                                                                            <TableCell align="right">
                                                                                {
                                                                                    row.prescription === '' ? null :
                                                                                        <div>
                                                                                            <RemoveRedEyeIcon sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen(row.prescription)} />
                                                                                            {/* <img src={row.prescription} /> */}
                                                                                        </div>

                                                                                }
                                                                            </TableCell>
                                                                            <TableCell align="right">{datee.toDateString()}</TableCell>
                                                                            <TableCell align="right">{row.deliverOption}</TableCell>
                                                                            <TableCell align="right">
                                                                                {
                                                                                    row.status !== 3 && row.status !== 4 && row.status !== 6 ? (
                                                                                        <>
                                                                                            {
                                                                                                row.status === 2 ? (
                                                                                                    <Button id="demo-customized-button"
                                                                                                        endIcon={<KeyboardArrowDownIcon />} onClick={(e) => handleStatusChange(e, row._id)}
                                                                                                        aria-controls={open ? 'demo-customized-menu' : undefined}
                                                                                                        aria-haspopup="true"
                                                                                                        aria-expanded={open ? 'true' : undefined}
                                                                                                        sx={{ minWidth: '100px', color: '#fdd835' }}
                                                                                                    >Pending

                                                                                                    </Button>
                                                                                                ) : row.status === 5 ? (
                                                                                                    <Button id="demo-customized-button"
                                                                                                        endIcon={<KeyboardArrowDownIcon />} onClick={(e) => handleStatusChange(e,  row._id)}
                                                                                                        aria-controls={open ? 'demo-customized-menu' : undefined}
                                                                                                        aria-haspopup="true"
                                                                                                        aria-expanded={open ? 'true' : undefined}
                                                                                                        sx={{ minWidth: '100px', color: '#00b0ff' }}
                                                                                                    >Accepted

                                                                                                    </Button>
                                                                                                ) : ''
                                                                                            }
                                                                                            <StyledMenu
                                                                                                id="demo-customized-menu"
                                                                                                MenuListProps={{
                                                                                                    'aria-labelledby': 'demo-customized-button',
                                                                                                }}
                                                                                                sx={{ minWidth: '100px' }}
                                                                                                anchorEl={anchorEl}
                                                                                                open={open}
                                                                                                onClose={handleClose}
                                                                                            >
                                                                                                <MenuItem onClick={(e) => statusChange(5, idtest)} disableRipple>
                                                                                                    Accept
                                                                                                </MenuItem>
                                                                                                <MenuItem onClick={(e) => statusChange(3, idtest)} disableRipple>
                                                                                                    Delivered
                                                                                                </MenuItem>
                                                                                                <MenuItem onClick={(e) => statusChange(4, idtest)} disableRipple>
                                                                                                    PickedUp
                                                                                                </MenuItem>
                                                                                                <MenuItem onClick={(e) => statusChange(6, idtest)} disableRipple>
                                                                                                    Reject
                                                                                                </MenuItem>
                                                                                                
                                                                                            </StyledMenu>
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            {
                                                                                                row.status === 6 ? (
                                                                                                    <Button id="demo-customized-button"

                                                                                                        sx={{ minWidth: '100px', color: '#ff3f3f' }}
                                                                                                    >Rejected

                                                                                                    </Button>
                                                                                                ) : row.status === 3 ? (
                                                                                                    <Button id="demo-customized-button"

                                                                                                        sx={{ minWidth: '100px', color: '#41bb13' }}
                                                                                                    >Delivered

                                                                                                    </Button>
                                                                                                ) : row.status === 4 ? (
                                                                                                    <Button id="demo-customized-button"

                                                                                                        sx={{ minWidth: '100px', color: '#41bb13' }}
                                                                                                    >Picked Up

                                                                                                    </Button>
                                                                                                ) : ''
                                                                                            }
                                                                                        </>

                                                                                    )
                                                                                }

                                                                            </TableCell>


                                                                        </TableRow>
                                                                    )

                                                                })
                                                            }
                                                        </>
                                                    )
                                                })
                                            }

                                            <ViewPrescription open={openpresc} close={closeDialog} prescription={prescriptionImg} />

                                        </>
                                    )

                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <TableContainer id='scroll-6' component={Paper} sx={{ overflowY: 'scroll', height: '450px' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell align="right">Customer</TableCell>
                                    <TableCell align="right">Order</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">View Prescription</TableCell>
                                    <TableCell align="right">Delivery Date</TableCell>
                                    <TableCell align="right">Delivery Type</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders?.cartPharma?.map((row, index) => {
                                    const datee = new Date(row.createdAt)

                                    if (row.status === 2) {
                                        return (
                                            <>
                                                {
                                                    orders?.products?.filter(prod => prod._id === row.productId).map(prod => {
                                                        // console.log("prodd", prod)
                                                        return (
                                                            <>
                                                                {
                                                                    orders?.customers?.filter(customer => customer._id === row.customerId).map(customer => {
                                                                        // console.log("prodd", customer)
                                                                        return (
                                                                            <TableRow
                                                                                key={row._id}
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                            >
                                                                                <TableCell component="th" scope="row">
                                                                                    {index + 1}
                                                                                </TableCell>
                                                                                <TableCell align="right">{customer?.firstName} {customer?.lastName} {customer?.pharmacyName} </TableCell>
                                                                                <TableCell align="right">{prod.productName}</TableCell>
                                                                                <TableCell align="right">{row.totalPrice}L.L.</TableCell>
                                                                                <TableCell align="right">
                                                                                    {
                                                                                        row.prescription === '' ? null :
                                                                                            <div>
                                                                                                <RemoveRedEyeIcon sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen(row.prescription)} />
                                                                                                {/* <img src={row.prescription} /> */}
                                                                                            </div>

                                                                                    }
                                                                                </TableCell>
                                                                                <TableCell align="right">{datee.toDateString()}</TableCell>
                                                                                <TableCell align="right">{row.deliverOption}</TableCell>
                                                                                <TableCell align="right">
                                                                                    <Button endIcon={<KeyboardArrowDownIcon />} onClick={(e) => handleStatusChange(e,  row._id)} id="demo-customized-button"
                                                                                        aria-controls={open ? 'demo-customized-menu' : undefined}
                                                                                        aria-haspopup="true"
                                                                                        aria-expanded={open ? 'true' : undefined}
                                                                                        sx={{ minWidth: '100px', color: '#fdd835' }}
                                                                                    >
                                                                                        Pending
                                                                                    </Button>
                                                                                    <StyledMenu
                                                                                        id="demo-customized-menu"
                                                                                        MenuListProps={{
                                                                                            'aria-labelledby': 'demo-customized-button',
                                                                                        }}
                                                                                        sx={{ minWidth: '100px' }}
                                                                                        anchorEl={anchorEl}
                                                                                        open={open}
                                                                                        onClose={handleClose}
                                                                                    >
                                                                                        <MenuItem onClick={(e) => statusChange(5, row._id)} disableRipple>
                                                                                            Accept
                                                                                        </MenuItem>
                                                                                        <MenuItem onClick={(e) => statusChange(3, row._id)} disableRipple>
                                                                                            Delivered
                                                                                        </MenuItem>
                                                                                        <MenuItem onClick={(e) => statusChange(4, row._id)} disableRipple>
                                                                                            PickedUp
                                                                                        </MenuItem>
                                                                                        <MenuItem onClick={(e) => statusChange(6, row._id)} disableRipple>
                                                                                            Reject
                                                                                        </MenuItem>
                                                                                    </StyledMenu>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )

                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }

                                                <ViewPrescription open={openpresc} close={closeDialog} prescription={prescriptionImg} />

                                            </>
                                        )
                                    }


                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <TableContainer id='scroll-6' component={Paper} sx={{ overflowY: 'scroll', height: '450px' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell align="right">Customer</TableCell>
                                    <TableCell align="right">Order</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">View Prescription</TableCell>
                                    <TableCell align="right">Delivery Date</TableCell>
                                    <TableCell align="right">Delivery Type</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders?.cartPharma?.map((row, index) => {
                                    const datee = new Date(row.createdAt)

                                    if (row.status === 5) {
                                        return (
                                            <>
                                                {
                                                    orders?.products?.filter(prod => prod._id === row.productId).map(prod => {
                                                        // console.log("prodd", prod)
                                                        return (
                                                            <>
                                                                {
                                                                    orders?.customers?.filter(customer => customer._id === row.customerId).map(customer => {
                                                                        // console.log("prodd", customer)
                                                                        return (
                                                                            <TableRow
                                                                                key={row._id}
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                            >
                                                                                <TableCell component="th" scope="row">
                                                                                    {index + 1}
                                                                                </TableCell>
                                                                                <TableCell align="right">{customer?.firstName} {customer?.lastName} {customer?.pharmacyName} </TableCell>
                                                                                <TableCell align="right">{prod.productName}</TableCell>
                                                                                <TableCell align="right">{row.totalPrice}L.L.</TableCell>
                                                                                <TableCell align="right">
                                                                                    {
                                                                                        row.prescription === '' ? null :
                                                                                            <div>
                                                                                                <RemoveRedEyeIcon sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen(row.prescription)} />
                                                                                                {/* <img src={row.prescription} /> */}
                                                                                            </div>

                                                                                    }
                                                                                </TableCell>
                                                                                <TableCell align="right">{datee.toDateString()}</TableCell>
                                                                                <TableCell align="right">{row.deliverOption}</TableCell>
                                                                                <TableCell align="right">
                                                                                    <Button endIcon={<KeyboardArrowDownIcon />} onClick={(e) => handleStatusChange(e,  row._id)} id="demo-customized-button"
                                                                                        aria-controls={open ? 'demo-customized-menu' : undefined}
                                                                                        aria-haspopup="true"
                                                                                        aria-expanded={open ? 'true' : undefined}
                                                                                        sx={{ minWidth: '100px' }}
                                                                                    >
                                                                                        Accepted
                                                                                    </Button>
                                                                                    <StyledMenu
                                                                                        id="demo-customized-menu"
                                                                                        MenuListProps={{
                                                                                            'aria-labelledby': 'demo-customized-button',
                                                                                        }}
                                                                                        sx={{ minWidth: '100px' }}
                                                                                        anchorEl={anchorEl}
                                                                                        open={open}
                                                                                        onClose={handleClose}
                                                                                    >
                                                                                        <MenuItem onClick={(e) => statusChange(3, row._id)} disableRipple>
                                                                                            Delivered
                                                                                        </MenuItem>
                                                                                        <MenuItem onClick={(e) => statusChange(4, row._id)} disableRipple>
                                                                                            PickedUp
                                                                                        </MenuItem>
                                                                                    </StyledMenu>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )

                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }

                                                <ViewPrescription open={openpresc} close={closeDialog} prescription={prescriptionImg} />

                                            </>
                                        )
                                    }


                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <TableContainer id='scroll-6' component={Paper} sx={{ overflowY: 'scroll', height: '450px' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell align="right">Customer</TableCell>
                                    <TableCell align="right">Order</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">View Prescription</TableCell>
                                    <TableCell align="right">Delivery Date</TableCell>
                                    <TableCell align="right">Delivery Type</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders?.cartPharma?.map((row, index) => {
                                    const datee = new Date(row.createdAt)

                                    if (row.status === 3) {
                                        return (
                                            <>
                                                {
                                                    orders?.products?.filter(prod => prod._id === row.productId).map(prod => {
                                                        // console.log("prodd", prod)
                                                        return (
                                                            <>
                                                                {
                                                                    orders?.customers?.filter(customer => customer._id === row.customerId).map(customer => {
                                                                        // console.log("prodd", customer)
                                                                        return (
                                                                            <TableRow
                                                                                key={row._id}
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                            >
                                                                                <TableCell component="th" scope="row">
                                                                                    {index + 1}
                                                                                </TableCell>
                                                                                <TableCell align="right">{customer?.firstName} {customer?.lastName} {customer?.pharmacyName} </TableCell>
                                                                                <TableCell align="right">{prod.productName}</TableCell>
                                                                                <TableCell align="right">{row.totalPrice}L.L.</TableCell>
                                                                                <TableCell align="right">
                                                                                    {
                                                                                        row.prescription === '' ? null :
                                                                                            <div>
                                                                                                <RemoveRedEyeIcon sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen(row.prescription)} />
                                                                                                {/* <img src={row.prescription} /> */}
                                                                                            </div>

                                                                                    }
                                                                                </TableCell>
                                                                                <TableCell align="right">{datee.toDateString()}</TableCell>
                                                                                <TableCell align="right">{row.deliverOption}</TableCell>
                                                                                <TableCell align="right">
                                                                                    <Button id="demo-customized-button"
                                                                                        sx={{ minWidth: '100px', color: '#41bb13' }}
                                                                                    >Delivered

                                                                                    </Button>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )

                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }

                                                <ViewPrescription open={openpresc} close={closeDialog} prescription={prescriptionImg} />

                                            </>
                                        )
                                    }


                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <TableContainer id='scroll-6' component={Paper} sx={{ overflowY: 'scroll', height: '450px' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell align="right">Customer</TableCell>
                                    <TableCell align="right">Order</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">View Prescription</TableCell>
                                    <TableCell align="right">Delivery Date</TableCell>
                                    <TableCell align="right">Delivery Type</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders?.cartPharma?.map((row, index) => {
                                    const datee = new Date(row.createdAt)

                                    if (row.status === 4) {
                                        return (
                                            <>
                                                {
                                                    orders?.products?.filter(prod => prod._id === row.productId).map(prod => {
                                                        // console.log("prodd", prod)
                                                        return (
                                                            <>
                                                                {
                                                                    orders?.customers?.filter(customer => customer._id === row.customerId).map(customer => {
                                                                        // console.log("prodd", customer)
                                                                        return (
                                                                            <TableRow
                                                                                key={row._id}
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                            >
                                                                                <TableCell component="th" scope="row">
                                                                                    {index + 1}
                                                                                </TableCell>
                                                                                <TableCell align="right">{customer?.firstName} {customer?.lastName} {customer?.pharmacyName} </TableCell>
                                                                                <TableCell align="right">{prod.productName}</TableCell>
                                                                                <TableCell align="right">{row.totalPrice}L.L.</TableCell>
                                                                                <TableCell align="right">
                                                                                    {
                                                                                        row.prescription === '' ? null :
                                                                                            <div>
                                                                                                <RemoveRedEyeIcon sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen(row.prescription)} />
                                                                                                {/* <img src={row.prescription} /> */}
                                                                                            </div>

                                                                                    }
                                                                                </TableCell>
                                                                                <TableCell align="right">{datee.toDateString()}</TableCell>
                                                                                <TableCell align="right">{row.deliverOption}</TableCell>
                                                                                <TableCell align="right">
                                                                                    <Button id="demo-customized-button"

                                                                                        sx={{ minWidth: '100px', color: '#41bb13' }}
                                                                                    >Picked Up

                                                                                    </Button>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )

                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }

                                                <ViewPrescription open={openpresc} close={closeDialog} prescription={prescriptionImg} />

                                            </>
                                        )
                                    }


                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}
