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

const SearchedProductSuggestions = ({ searchedProduct }) => {
    console.log("searcheeeeeee", searchedProduct)
    const [suggestions, setSuggestions] = useState([]);

    useEffect(async () => {
        const result = await getSearchedProductsSuggestions(searchedProduct);

        setSuggestions(result.data.data);
    }, [searchedProduct]);

    console.log("suggestions", suggestions);

    return (
        <div>
            <Typography className='suggestions' variant="h5" gutterBottom component="div" >Product Availability</Typography>
            <Grid container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', textAlign: 'center'}}>
                
                <Grid item md={4} sm={4} xs={4}>
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

                </Grid>
            </Grid>
        </div>

    )
}

export default SearchedProductSuggestions