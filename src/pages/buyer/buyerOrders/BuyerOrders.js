import Navbar from "../../../components/navbar/Navbar"
import { DataGrid } from '@mui/x-data-grid';
import "./BuyerOrders.css"
import { useState, useEffect } from "react";
import { getBuyerOrders } from "../../../api";
import Typography from '@mui/material/Typography';

const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'productName', headerName: 'Product Name', width: 340 },
    { field: 'pharmacyName', headerName: 'Pharmacy', width: 250 },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 150,
    },
    { field: 'deliveryOption', headerName: 'Delivery Option', width: 200 },
    {
        field: 'date',
        headerName: 'Last Updated Date',
        type: 'number',
        width: 200,
    },
    { field: 'status', headerName: 'Status', width: 140 },

];

const BuyerOrders = () => {
    const loggedUser = JSON.parse(localStorage.getItem("profile"));
    const [buyerOrders, setBuyerOrders] = useState([]);


    useEffect(async () => {
        const req = await getBuyerOrders(loggedUser._id);
        setBuyerOrders(req?.data?.data)
    }, [])
    console.log("reqq", buyerOrders)

    let rows = [];
    buyerOrders.orders?.map((order, index) => {
        buyerOrders.products.filter(product => product._id === order.productId).map(product => {
            buyerOrders.pharmacies.filter(pharma => pharma._id === product.pharmaId).map(pharma => {
                const datee = new Date(order.updatedAt)
                rows.push({
                    id: index + 1,
                    productName: product.productName,
                    pharmacyName: pharma.pharmacyName,
                    deliveryOption: order.deliverOption,
                    status: order.status == 1 ? 'In Cart' : order.status == 2 ? 'Pending' : order.status == 3 ? 'Delivered' : order.status == 4 ? 'Picked Up' : order.status == 5 ? 'Approved' : order.status == 6 ? 'Rejected' : 'Cancelled',
                    price: order.totalPrice,
                    date: datee.toDateString()
                })
            })
        })

    })
    console.log("logs", rows)

    return (
        <div className="hi">
            <Navbar />
            <div style={{ height: 500, width: '100%' }}>
                <div style={{ display: 'flex', paddingTop: '100px', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography className='tablelog' variant="h5" gutterBottom component="div" sx={{color: '#00a49c'}} >My Orders History</Typography>
                </div>

                <DataGrid
                    id='scroll-7'
                    sx={{ backgroundColor: 'white', width: '90%', marginLeft: '80px' }}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
        </div>
    )
}

export default BuyerOrders