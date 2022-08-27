import { RelatedProducts } from '@algolia/recommend-react';
import recommend from '@algolia/recommend';
import "./ProductDetails.css";
import { useEffect, useState } from 'react';
import { getProducts } from '../../api';
import { useNavigate } from 'react-router-dom';
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import '@algolia/ui-components-horizontal-slider-theme';


import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const recommendClient = recommend('QHDS01X04N', 'ce85478d2f0174065944ac523158bb43');
const indexName = 'pw3';

function RelatedItem({ item }) {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    useEffect(async () => {
        const res = await getProducts();
        setProducts(res.data.data)
    }, [])

    const goToProd = (id) => {
        navigate('/home/product/' + id)
    }

    return (
        <span className='ele'>
            {
                JSON.stringify(item._score) > 75 ? (
                    products?.filter(prod => prod.productName === item.productName).map(prod => {
                        console.log("jskkaa", prod)
                        return (
                            // <p onClick={() => goToProd(prod._id)}>{prod.productName}</p>
                            <Card sx={{ maxWidth: 300 }}>
                                <div style={{ width: '120px', height: '120px', margin: 'auto' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: '100%', height: '100%', marginTop: '20px' }}
                                        image={prod.image}
                                        alt={prod.productName}
                                    />
                                </div>
                                <Divider sx={{ marginTop: '20px', color: '#ffa26cd7' }} />

                                <Box sx={{ width: '100%', }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5"  >
                                            {prod.productName}
                                        </Typography>
                                        <Typography variant="subtitle1" component="div">
                                            <b>Price: </b> {prod.price} L.L.
                                        </Typography>
                                        <Typography variant="subtitle1" component="div">
                                            <b>Quantity: </b> {prod.quantity}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        <Button variant="contained" className='btnAdd' sx={{ width: '90%', marginBottom: '20px', backgroundColor: '#00B8B0', }} onClick={() => goToProd(prod._id)}>View Details</Button>
                                    </Box>
                                </Box>

                            </Card>
                        )
                    })
                ) : null
            }
            
        </span>

    );
}

function AppProducts({ item }) {
    // ...
    const ids = []
    ids.push(item._id)
    console.log("jsksks", ids)



    return (
        <div>
            <RelatedProducts
                recommendClient={recommendClient}
                indexName={indexName}
                // objectIDs={['62b853342230af32158c385d']}
                objectIDs={[item.productName]}
                itemComponent={RelatedItem}
                view={HorizontalSlider}
            />
        </div>

    );
}

export default AppProducts

// export default RelatedIngreditentsProducts;