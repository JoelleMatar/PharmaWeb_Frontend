import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { deleteOrderItem, getPharmaciesList, getProductDetails, getProducts } from "../../api";
import DeleteIcon from '@mui/icons-material/Delete';
import "./ShoppingCartItem.css";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

export default function ShoppingCartItem({ cart }) {
    console.log("carttt", cart)
    // const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);
    const [prescription, setPrescription] = useState(null);
    const [fileName, setFileName] = useState("");
    const formData = new FormData();

    useEffect(async () => {
        const productlist = [];
        const pharmaslist = [];
        const prods = await getProducts();
        // console.log("prods", prods)
        prods && prods?.data?.data?.map(prod => {
            // console.log("hii", prod)
            cart?.map(cartitem => {
                if (cartitem.productId === prod._id) {
                    // console.log("hii", cartitem)
                    productlist.push(prod);
                }
            })
        })
        setProducts(productlist);



        const pharmas = await getPharmaciesList();
        productlist?.map(prod => {
            pharmas?.data?.data?.map(pharma => {
                if (prod.pharmaId === pharma._id) {
                    pharmaslist.push(pharma);
                }
            })
        })

        setPharmacies(pharmaslist);
    }, [cart]);

    const deleteOrder = async (id) => {
        const deleteItem = await deleteOrderItem(id);

        // console.log("deleteItem", deleteItem)
        if (deleteItem.data.success == true) {
            window.location.reload();
        }

    }

    const handlePrescription = (event) => {
        setPrescription(event.target.files[0])
        setFileName(event.target.files[0].name);

        formData.append("file", event.target.files[0]);
        formData.append("fileName", event.target.files[0].name);

    }

    console.log("prescp", formData)

    return (
        <div>
            {
                cart.map(cart => {
                    return (
                        <div>
                            {
                                products?.filter(product => {
                                    return product._id === cart.productId
                                })
                                    .map(product => {
                                        // console.log("prodictt", product)
                                        return (
                                            <div>
                                                {/* {
                                                    pharmacies?.filter(pharma => {
                                                        return pharma._id === product.pharmaId
                                                    })
                                                        .map(pharma => {
                                                            console.log("prodictt", product)
                                                            return ( */}
                                                <Card sx={{ display: 'flex', marginBottom: '20px', boxShadow: ' 0px 2px 0px 2px #cccccc', marginLeft: '-100px' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                        <CardMedia
                                                            component="img"
                                                            sx={{ width: 100, marginTop: 0 }}
                                                            image={product?.image}
                                                            alt={product.productName}
                                                        />
                                                    </div>

                                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                        <Grid container>
                                                            <Grid item md={6} sm={6} xs={6}>
                                                                <CardContent sx={{ flex: '1 0 auto' }}>
                                                                    <Typography component="div" variant="h5">
                                                                        {product.productName}
                                                                    </Typography>
                                                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                        Quantity: {product.quantity}
                                                                    </Typography>
                                                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                        Price: {product.price}L.L.
                                                                    </Typography>
                                                                </CardContent>
                                                            </Grid>

                                                            <Grid item md={5} sm={5} xs={5}>
                                                                <CardContent sx={{ flex: '1 0 auto' }}>
                                                                    {
                                                                        product?.category ? (
                                                                            <div>
                                                                                <label for="file-upload" className="custom-file-upload" >
                                                                                    <DriveFolderUploadIcon sx={{ marginTop: "5px" }} /> Upload Doctor Prescription
                                                                                </label>
                                                                                <input id="file-upload" name="pharmacyLicense" type="file" onChange={(e) => handlePrescription(e)} />
                                                                            </div>
                                                                        ) : (
                                                                            <div></div>
                                                                        )
                                                                    }
                                                                    {/* <Typography component="div" variant="h6">
                                                                                        Pharmacy Info
                                                                                    </Typography>
                                                                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                                        Pharmacy Name: {pharma.pharmacyName}
                                                                                    </Typography>
                                                                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                                        Pharmacy Location: {pharma.city}
                                                                                    </Typography> */}
                                                                </CardContent>
                                                            </Grid>

                                                            <Grid item md={1} sm={1} xs={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, cursor: 'pointer' }} onClick={() => deleteOrder(cart._id)}>
                                                                    <DeleteIcon sx={{ color: 'red' }} />
                                                                </Box>
                                                            </Grid>
                                                        </Grid>


                                                    </Box>


                                                </Card>
                                                {/* )
                                                        })

                                                } */}

                                            </div>
                                        )
                                    })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}