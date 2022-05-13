import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import "./SearchedProductSuggestions.css";
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getSearchedProductsSuggestions } from '../../../api';

const SearchedProductSuggestions = ({ searchedProduct }) => {
    console.log("searcheeeeeee", searchedProduct)
    const [suggestions, setSuggestions] = useState([]);

    useEffect(async () => {
        const result = await getSearchedProductsSuggestions(searchedProduct);

        setSuggestions(result.data.data);
    }, [searchedProduct]);

    console.log("suggestions", suggestions);

    return (
        <Grid container>
            <Grid item md={3} sm={4} xs={6}>
                {
                    suggestions?.products?.map((suggestionProduct, index) => {
                        // suggestions?.pharmacies?.map((suggestionPharmacy, index) => {
                            return (
                                console.log("hii", suggestionProduct),
                                <Paper className="suggestion" key={index}>
                                    <div className="suggestion-text">
                                        <p>{suggestionProduct.price}</p>
                                        {/* <p>{suggestionPharmacy.pharmacyName}</p> */}
                                    </div>
                                </Paper>
                            )
                        // })
                    })
                    
                }
                {
                    suggestions?.pharmacies?.map((suggestionPharmacy, index) => {
                        return (
                            // console.log("hii", suggestionProduct),
                            <Paper className="suggestion" key={index}>
                                <div className="suggestion-text">
                                    {/* <p>{suggestionProduct.price}</p> */}
                                    <p>{suggestionPharmacy.pharmacyName}</p>
                                </div>
                            </Paper>
                        )
                    })
                }
            </Grid>
        </Grid>
    )
}

export default SearchedProductSuggestions