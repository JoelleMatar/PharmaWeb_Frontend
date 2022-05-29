import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { getProductDetails } from "../../api";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        marginTop: 15
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        flex: "1 0 auto"
    },
    cover: {
        width: 151
    }
}));

export default function ShoppingCartItem({ cart }) {
    console.log("carttt", cart)
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const productlist = [];
    useEffect(async () => {
        cart?.map(async (cartitem) => {
            const result = await getProductDetails(cartitem.productId);

            productlist.push(result?.data?.data[0])
            setProducts(productlist);
        })
    }, []);

    console.log("productsssss", products)

    return (
        <div>
            {
                cart?.map(cartitem => {
                    return (
                        <div>
                            {
                                products?.map(product => {
                                    return (
                                        <Card className={classes.root}>
                                            <CardMedia
                                                className={classes.cover}
                                                image={product?.image}
                                                title={product?.productName}
                                            />
                                            <CardContent className={classes.content}>
                                                <CardMedia
                                                    className={classes.cover}
                                                    image={product?.image}
                                                    title={product?.productName}
                                                />
                                                <Typography variant="div" component="h2">
                                                    {product?.productName}
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    <hr />
                                                </Typography>
                                                <Grid container>
                                                    <Grid item xs={11} sm={11} md={11} lg={11}>
                                                        <Typography variant="body1" component="div">
                                                            Form
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1} sm={1} md={1} lg={1}>
                                                        <Typography variant="h6" component="div">
                                                            {product?.form}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={11} sm={11} md={11} lg={11}>
                                                        <Typography variant="body1" component="div">
                                                            Quantity
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1} sm={1} md={1} lg={1}>
                                                        <Typography variant="h6" component="div">
                                                            {cart?.quantity}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={10} sm={9} md={10} lg={10}>
                                                        <Typography
                                                            variant="body1"
                                                            component="div"
                                                            style={{ fontWeight: "bold" }}
                                                        >
                                                            Price
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2} sm={2} md={2} lg={1}>
                                                        <Typography variant="h6" component="div" color="secondary">
                                                            {product?.price}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
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