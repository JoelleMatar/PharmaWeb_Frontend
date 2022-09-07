import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import "./SearchedProductSuggestions.css";
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getSearchedProductsSuggestions } from '../../../api';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router";

const SearchedProductSuggestions = ({ searchedProduct }) => {
    console.log("searcheeeeeee", searchedProduct)
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(async () => {
        const result = await getSearchedProductsSuggestions(searchedProduct);

        setSuggestions(result.data.data);
    }, [searchedProduct]);

    console.log("suggestions", suggestions);

    const goToProductDetail = (id) => {
        navigate('/home/product/' + id)
    }

    return (
        <div>
            <Typography className='suggestions' variant="h5" gutterBottom component="div" >Product Availability</Typography>
            <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', textAlign: 'center' }}>

                <Grid item md={12} sm={12} xs={12}>

                    <List>
                        <Grid container>
                            <ListItem disablePadding sx={{ textAlign: 'center', fontSize: '20px', color: '#003633' }}>
                                <Grid item md={4} sm={4}><ListItemText><b>Pharmacy Name</b></ListItemText></Grid>
                                <Grid item md={4} sm={4}><ListItemText><b>Location</b></ListItemText></Grid>
                                <Grid item md={4} sm={4}><ListItemText><b>Product Price</b></ListItemText></Grid>
                            </ListItem>
                        </Grid>
                    </List>
                    {
                        suggestions?.products?.map(prod => {
                            return (
                                <div>
                                    {
                                        suggestions?.pharmacies?.filter(p => p._id === prod.pharmaId).map(pharmacy => {
                                            return (
                                                <List>
                                                    <ListItem disablePadding>
                                                        <Grid container>
                                                            <ListItemButton key={prod._id} onClick={() => goToProductDetail(prod._id)} className='listItem' sx={{ width: '300px', textAlign: 'center', fontSize: '20px' }}>
                                                                <Grid item md={4} sm={4}><ListItemText sx={{ textAlign: 'center' }} primary={pharmacy.pharmacyName} /></Grid>
                                                                <Grid item md={4} sm={4}><ListItemText sx={{ textAlign: 'center' }} primary={pharmacy.city} /></Grid>
                                                                <Grid item md={4} sm={4}><ListItemText sx={{ textAlign: 'center' }} primary={prod.price} /></Grid>
                                                            </ListItemButton>
                                                        </Grid>

                                                    </ListItem>
                                                </List>
                                            )
                                        }

                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </Grid>


                {/* <Grid item md={4} sm={4} xs={4}>
                    {
                        suggestions?.pharmacies?.map((suggestionPharmacy, index) => {
                            return (
                                // <Paper className="suggestion" key={index}>
                                //     <div className="suggestion-text">

                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton className='listItem' sx={{width: '300px', textAlign: 'center', fontSize: '20px'}}>
                                            <ListItemText key={index} primary={suggestionPharmacy.pharmacyName} />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                                //     </div>
                                // </Paper>
                            )
                        })
                    }
                </Grid>
                <Grid item md={4} sm={4} xs={4}>
                    {
                        suggestions?.pharmacies?.map((suggestionPharmacy, index) => {
                            return (
                                // <Paper className="suggestion" key={index}>
                                //     <div className="suggestion-text">

                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton className='listItem' sx={{width: '300px', textAlign: 'center'}}>
                                            <ListItemText key={index} primary={suggestionPharmacy.city} />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                                //     </div>
                                // </Paper>
                            )
                        })
                    }
                </Grid>
                <Grid item md={4} sm={4} xs={4}>
                    {
                        suggestions?.products?.map((suggestionProduct, index) => {
                            return (
                                console.log("yow", index),

                                // <Paper className="suggestion" key={index}>
                                //     <div className="suggestion-text">
                                // <p key={index}>{suggestionProduct.price}</p>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton className='listItem' sx={{width: '300px', textAlign: 'center'}}>
                                            <ListItemText key={index} ><b>{suggestionProduct.price + " L.L."}</b></ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                                //     </div>
                                // </Paper>
                            )
                        })

                    }

                </Grid> */}
            </Grid>
        </div>

    )
}

export default SearchedProductSuggestions