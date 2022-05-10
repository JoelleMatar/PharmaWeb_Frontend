import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./HomeProductCard.css";

export default function HomeProductCard({ product }) {
    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex' }}>
            <div style={{width: '120px', height: '120px'}}>
                <CardMedia
                component="img"
                sx={{ width: '100%', height: '100%', marginTop: '20px', marginLeft: '10px' }}
                image={product.image}
                alt={product.productName}
            />
            </div>
            
            <Box sx={{width: '60%', marginLeft: '40px' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {product.productName}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        <b>Price: </b> {product.price}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        <b>Quantity: </b> {product.quantity}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <Button variant="contained" className='btnAdd' sx={{ marginRight: '0', width: '100%', marginBottom: '20px', backgroundColor: '#00B8B0', }} color="primary">View More</Button>
                </Box>
            </Box>

        </Card>
    );
}