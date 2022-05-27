import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./HomeProductCard.css";
import Divider from '@mui/material/Divider';
import { useState, useEffect } from "react";
import { getUser } from "../../../api/index";
import { useNavigate } from "react-router-dom";

export default function HomeProductCard({ product }) {
    const theme = useTheme();
    const [pharmacy, setPharmacy] = useState([]);
    const navigate = useNavigate();

    useEffect(async() => {
        const result = await getUser(product?.pharmaId);

        setPharmacy(result?.data?.data[0]);
    }, []);

    console.log("pharmacy", pharmacy);

    const goToProduct = (product) => {
        navigate(`/home/product/${product._id}`);
    }

    return (
        <Card sx={{ maxWidth: 300 }}>
            <div style={{ width: '120px', height: '120px', margin: 'auto' }}>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: '100%', marginTop: '20px' }}
                    image={product.image}
                    alt={product.productName}
                />
            </div>
            <Divider sx={{ marginTop: '20px', color: '#ffa26cd7' }} />

            <Box sx={{ width: '100%', }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5"  >
                        {product.productName}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        <b>Pharmacy: </b> {pharmacy?.pharmacyName}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        <b>Price: </b> {product.price} L.L.
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        <b>Quantity: </b> {product.quantity}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        <b>City: </b> {pharmacy?.city}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button variant="contained" className='btnAdd' sx={{ width: '90%', marginBottom: '20px', backgroundColor: '#00B8B0', }} onClick={() => goToProduct(product)}>View More</Button>
                </Box>
            </Box>

        </Card>
    );
}