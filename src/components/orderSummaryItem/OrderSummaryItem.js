import React, { useState, useEffect } from "react";
// import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { getProducts } from "../../api";
import ConfirmOrderDialog from "./ConfirmOrderDialog";

export default function OrderSummaryItem({ cart }) {
    // const classes = useStyles();
    console.log("cart", cart);

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    }
  

    useEffect(async () => {
        const productlist = [];
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

        let totalP = 0;
        cart.map(cartitem => {
            console.log("cartitem", cartitem.totalPrice);
            totalP += cartitem.totalPrice;
        })
        console.log("totalPrice", totalP);
        setTotal(totalP);
    }, [cart]);

    return (
        <Card elevation={5} sx={{ width: '500px' }}>
            <CardContent>
                <Typography variant="div" component="h1">
                    {" "}
                    Order Summary
                </Typography>
                <Typography variant="subtitle2">
                    <hr />
                </Typography>
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
                                                <Grid container sx={{ marginTop: '10px' }}>
                                                    <Grid item xs={9} sm={9} md={9} lg={9}>
                                                        <Typography variant="body1" component="div">
                                                            {product.productName} * {cart.quantity}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={3} sm={3} md={3} lg={3}>
                                                        <Typography variant="h6" component="div">
                                                            {cart.totalPrice}L.L.
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                }
                            </div>
                        )
                    })
                }

                <Typography variant="h5" component="div" sx={{ float: "right" }}>
                    <b>Total: {total}L.L.</b>
                </Typography>

            </CardContent>

            <Button variant="contained" className='btnAdd' sx={{ width: '80%', height: '40px', marginTop: '20px', marginBottom: '20px', backgroundColor: '#00B8B0', marginLeft: '10%' }} onClick={() => handleClickOpen()} >Confirm Order</Button>

            <ConfirmOrderDialog open={open} carts={cart} products={products} close={closeDialog} />
        </Card>
    );
}