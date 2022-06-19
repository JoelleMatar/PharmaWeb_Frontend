import React from "react";
// import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// const useStyles = makeStyles({
//     root: {
//         position: "sticky",
//         top: "1rem",
//         minWidth: "275"
//     },

//     title: {
//         fontSize: 14
//     },
//     pos: {
//         marginBottom: 12
//     }
// });

export default function OrderSummaryItem() {
    // const classes = useStyles();

    return (
        <Card  elevation={5}>
            <CardContent>
                <Typography
                    color="textSecondary"
                    gutterBottom
                >
                    Shopping Cart
                </Typography>
                <Typography variant="div" component="h1">
                    {" "}
                    Order Summary
                </Typography>
                <Typography variant="subtitle2">
                    <hr />
                </Typography>
                <Grid container>
                    <Grid item xs={11} sm={11} md={11} lg={11}>
                        <Typography variant="body1" component="div">
                            Shipping
                        </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1}>
                        <Typography variant="h6" component="div">
                            €0
                        </Typography>
                    </Grid>
                    <Grid item xs={11} sm={11} md={11} lg={11}>
                        <Typography variant="body1" component="div">
                            Total
                        </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1}>
                        <Typography variant="h6" component="div">
                            €0
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions>
                <Button size="large" color="secondary">
                    BUY NOW ({1})
                </Button>
            </CardActions>
        </Card>
    );
}