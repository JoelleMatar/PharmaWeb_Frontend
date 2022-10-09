import { RelatedProducts } from '@algolia/recommend-react';
import recommend from '@algolia/recommend';
import "./ProductDetails.css";
import { useEffect, useState } from 'react';
import { getProductbyName, getProducts, getProductsbyName } from '../../api';
import { useNavigate } from 'react-router-dom';
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import '@algolia/ui-components-horizontal-slider-theme';
import $ from 'jquery';
import Badge from '@mui/material/Badge';
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

    const goToProd = async(name) => {
        console.log("name", name)
        const req = await getProductsbyName(name)
        console.log("hii", req.data)
        navigate('/home/product/630a1520fa703e9696644003')
    }

   

    return (
        <span className='ele' >
            {/* {
                JSON.stringify(item._score) > 75 ? (
                    products?.filter(prod => prod.productName === item.productName).map(prod => {
                        console.log("jskkaa", prod)
                        return ( */}
                            <Card sx={{ maxWidth: 300 }}>
                                {/* <CardHeader
                                    action={
                                        <div>
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        </div>
                                    }
                                    title={
                                        <Badge badgeContent={"2"} color="secondary">
                                        </Badge>
                                    }
                                    subheader="September 14, 2016"
                                /> */}
                                <Badge badgeContent={item._score} color="secondary" sx={{float: 'right', marginRight: '25px', marginTop: '10px'}}>
                                        </Badge>
                                {/* <div style={{ width: '120px', height: '120px', margin: 'auto' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: '100%', height: '100%', marginTop: '20px' }}
                                        image={product.image}
                                        alt={prod.productName}
                                    />
                                </div> */}
                                {/* <Divider sx={{ marginTop: '20px', color: '#ffa26cd7' }} /> */}

                                <Box sx={{ width: '100%', }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5"  >
                                            {item?.productName}
                                        </Typography>
                                        {/* <Typography variant="subtitle1" component="div">
                                            <b>Price: </b> {item?.price} L.L.
                                        </Typography>
                                        <Typography variant="subtitle1" component="div">
                                            <b>Quantity: </b> {item?.quantity}
                                        </Typography> */}
                                    </CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        <Button variant="contained" className='btnAdd' sx={{ width: '90%', marginBottom: '20px', backgroundColor: '#00B8B0', }} onClick={() => goToProd(item?.productName)}>View Details</Button>
                                    </Box>
                                </Box>

                            </Card>
                        {/* )
                    })
                ) : null
            } */}

        </span>

    );
}

function AppProducts({ item }) {
    // ...
    const ids = []
    ids.push(item._id)
    console.log("jsksks", ids)


    // $('#auc-Recommend-title').attr('h3', 'Product Replacements');
    return (
        <div style={{ width: '95%', marginLeft: '25px'}}>
            <RelatedProducts
                recommendClient={recommendClient}
                indexName={indexName}
                objectIDs={[item.productName]}
                itemComponent={RelatedItem}
                view={HorizontalSlider}
                
            />
        </div>

    );
}

export default AppProducts

// export default RelatedIngreditentsProducts;