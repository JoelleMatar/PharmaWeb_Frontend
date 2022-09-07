import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { getPharmacyLogs } from '../../api';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import "./PharmacyLogs.css";
import RefillStockDialog from './RefillStockDialog';

const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'productName', headerName: 'Product Name', width: 305 },
    { field: 'type', headerName: 'Log Type', width: 180 },
    {
        field: 'previousStock',
        headerName: 'Previous Stock',
        type: 'number',
        width: 150,
    },
    {
        field: 'currentStock',
        headerName: 'Current Stock',
        type: 'number',
        width: 150,
    },
    { field: 'date', headerName: 'Log Date', width: 180 },

];


export default function PharmacyLogs() {
    const [logs, setLogs] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem('profile'));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    }

    useEffect(async () => {
        const res = await getPharmacyLogs(loggedUser._id);

        setLogs(res?.data?.data)
    }, [])

    let rows = [];
    logs?.map((log, index) => {
        const datee = new Date(log.createdAt)
        rows.push({
            id: index + 1,
            productName: log.productName,
            type: log.type,
            previousStock: log.previousStock,
            currentStock: log.currentStock,
            date: datee.toDateString()
        })
    })
    console.log("logs", rows)


    return (
        <div style={{ height: 500, width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography className='tablelog' variant="h4" gutterBottom component="div" sx={{fontSize: '30px'}}>Your Products Logs</Typography>
                <Button variant="contained" className='btnAdd' sx={{ float: 'right', backgroundColor: '#00B8B0', height: '40px', marginTop: '30px' }} color="primary" onClick={() => handleClickOpen()}>Refill Stock</Button>
            </div>


            <DataGrid
                id='scroll-6'
                sx={{ backgroundColor: 'white', marginLeft: '80px', overflowY: 'scroll' }}
                rows={rows}
                columns={columns}
                pageSize={7}
                rowsPerPageOptions={[10]}
            // checkboxSelection
            />

            <RefillStockDialog open={open} close={closeDialog} />

        </div>
    );
}
