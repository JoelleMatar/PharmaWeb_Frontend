import TextField from '@mui/material/TextField';
import { useState, useEffect, useRef } from 'react';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import donateD from "../../assets/donateDrugs.jpg";
import requestDrugs from "../../assets/requestDrugs.jpg";
import pharmacies from "../../assets/pharmacies.jpg";

const HomeServicesCards = () => {

    return (
        <Grid container>
            <Grid item md={3} sm={6} xs={12}>
                <Card sx={{ maxWidth: 345 }}>
                    {/* <CardActionArea> */}
                    <CardMedia
                        component="img"
                        height="140"
                        image={donateD}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    {/* </CardActionArea> */}
                </Card>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
                <Card sx={{ maxWidth: 345 }}>
                    {/* <CardActionArea> */}
                    <CardMedia
                        component="img"
                        height="140"
                        image={requestDrugs}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    {/* </CardActionArea> */}
                </Card>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
                <Card sx={{ maxWidth: 345 }}>
                    {/* <CardActionArea> */}
                    <CardMedia
                        component="img"
                        height="140"
                        image={donateD}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    {/* </CardActionArea> */}
                </Card>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
                <Card sx={{ maxWidth: 345 }}>
                    {/* <CardActionArea> */}
                    <CardMedia
                        component="img"
                        height="140"
                        image={pharmacies}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    {/* </CardActionArea> */}
                </Card>
            </Grid>
        </Grid>
    )
}

export default HomeServicesCards