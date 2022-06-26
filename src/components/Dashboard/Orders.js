import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title.js';
import { useEffect, useState } from "react";
import { getLoggedPharmacyOrders } from "../../api/index";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router';



export default function Orders() {
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


    const goToOrders = (event) => {
        event.preventDefault();
        navigate('/pharmacy/orders');
    }

    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell align="right">Customer</TableCell>
                        <TableCell align="right">Order</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Delivery Date</TableCell>
                        <TableCell align="right">Delivery Type</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.cartPharma?.slice(0, 6).map((row, index) => {
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
                                                                    <TableCell align="right">{datee.toDateString()}</TableCell>
                                                                    <TableCell align="right">{row.deliverOption}</TableCell>
                                                                    <TableCell align="right">
                                                                        <Button id="demo-customized-button"

                                                                            sx={{ minWidth: '100px', color: '#41bb13' }}
                                                                        >Pending

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
                                </>
                            )
                        }


                    })}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={goToOrders} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}