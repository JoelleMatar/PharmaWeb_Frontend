import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import "./homeSearchBar.css";
import homeBG from "../../assets/homeSearchBg.jpg";
import { Typography } from '@mui/material';
import Typewriter from "typewriter-effect";
import { useState, useEffect } from 'react';
import { getProducts } from '../../api';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SearchedProductSuggestions from './SearchedProductSuggestions/SearchedProductSuggestions';

const HomeSearchBar = () => {
    const [drugs, setDrugs] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(async () => {
        const result = await getProducts();

        setDrugs(result);
    }, []);
    console.log("drugss", drugs);

   const handleSearchChange = (searchedDrug, params) => {
        setSearch(params);
    }

    return (
        <div className="searchArea">
            <img src="https://img.freepik.com/free-vector/pharmacy-medical-shop-concept_74855-7815.jpg?w=1060&t=st=1652301307~exp=1652301907~hmac=8cda76f71ca72686366ae34780e35b40d12ecbf80f6017c97d2f02f0a66baf6f" style={{ opacity: '0.6' }} />

            <div className="text">
                <Typewriter

                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Welcome to PharmaWeb, Your First Stop to Find Your Medicine!")
                            .pauseFor(1000)
                            .deleteAll()
                            .typeString("Welcome to PharmaWeb, Your First Stop to Find Your Medicine!")
                            .start();
                    }}
                />
            </div>

            <Stack spacing={2} className="searchBar">
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={drugs?.data?.data?.map((option) => option.productName)}
                    onChange={(event, value) => handleSearchChange(event, value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Enter Product Name"
                            name="searchedProduct"
                            value={search}
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                            
                        />
                    )}
                />
            </Stack>

            <SearchedProductSuggestions searchedProduct={search}  />

        </div>

    )
}

export default HomeSearchBar