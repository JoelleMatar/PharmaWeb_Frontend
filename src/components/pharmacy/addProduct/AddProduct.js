import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from "react";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import ProductIngredient from "./drug-ingredient.json";

const AddProduct = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const productFormTypes = [
        {
            name: "Tablet"
        },
        {
            name: "Capsule"
        },
        {
            name: "Syrup"
        },
        {
            name: "Injection"
        },
        {
            name: "Inhaler"
        },
        {
            name: "Drops"
        },
        {
            name: "Lotion"
        },
        {
            name: "Powder"
        },
        {
            name: "Lozenges"
        },
        {
            name: "Implant"
        },
        {
            name: "Ointment"
        },
        {
            name: "Cream"
        },
        {
            name: "Suppository"
        },
        {
            name: "Transdermal patch"
        },
        {
            name: "Gel"
        },
        {
            name: "Spray"
        }
    ]

    return (
        <Grid container >
            <Typography variant="h4" sx={{ marginLeft: '35%' }}>Add New Product</Typography>
            <Grid item md={6} sm={6} xs={12}>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Product Name"
                        type={'text'}
                        name="productName"
                        // value={formikBuyer.values.firstName}
                        // onChange={formikBuyer.handleChange}
                        // onBlur={formikBuyer.handleBlur}
                        placeholder="Enter Product Name"
                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                    />
                    {/* {formikBuyer.touched.firstName && formikBuyer.errors.firstName ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formikBuyer.errors.firstName}</div></span> : null} */}
                </div>
                <div>
                    {/* <TextField
                        id="outlined-required"
                        label="Dosage"
                        type={'text'}
                        name="dosage"
                        // value={formikBuyer.values.lastName}
                        // onChange={formikBuyer.handleChange}
                        // onBlur={formikBuyer.handleBlur}
                        placeholder="Enter Product Dose"
                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                    /> */}
                    {/* {formikBuyer.touched.lastName && formikBuyer.errors.lastName ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formikBuyer.errors.lastName}</div></span> : null} */}

                    <Autocomplete
                        multiple
                        id="tags-filled"
                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                        options={["100ml", "200ml"]}
                        // defaultValue={[top100Films[13].title]}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Dosage"
                                placeholder="Dosage"
                                name="dosage"
                            />
                        )}
                    />
                </div>
                <div>
                    {/* <TextField
                        required
                        id="outlined-required"
                        label="Form"
                        type={'text'}
                        name="form"
                        // value={formikBuyer.values.phoneNumber}
                        // onChange={formikBuyer.handleChange}
                        // onBlur={formikBuyer.handleBlur}
                        placeholder="Enter Product Form"
                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                    /> */}
                    {/* {formikBuyer.touched.phoneNumber && formikBuyer.errors.phoneNumber ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formikBuyer.errors.phoneNumber}</div></span> : null} */}
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                        options={productFormTypes}
                        getOptionLabel={(productFormTypes) => productFormTypes.name}
                        defaultValue={[productFormTypes[0]]}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Product Form"
                                placeholder="Product Form"
                            />
                        )}
                    />
                </div>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <div>
                    {/* <TextField
                        id="outlined-required"
                        label="Ingredients"
                        type={'text'}
                        name="ingredients"
                        // value={formikBuyer.values.phoneNumber}
                        // onChange={formikBuyer.handleChange}
                        // onBlur={formikBuyer.handleBlur}
                        placeholder="Enter Product Ingredients"
                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                    /> */}
                    {/* {formikBuyer.touched.phoneNumber && formikBuyer.errors.phoneNumber ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formikBuyer.errors.phoneNumber}</div></span> : null} */}

                    <Autocomplete
                        multiple
                        id="tags-filled"
                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                        options={ProductIngredient.map((option) => option.Ingredient)}
                        defaultValue={[ProductIngredient[13].Ingredient]}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Product Ingredients"
                                placeholder="Product Ingredients"
                            />
                        )}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Price"
                        type={'number'}
                        name="price"
                        // value={formikBuyer.values.phoneNumber}
                        // onChange={formikBuyer.handleChange}
                        // onBlur={formikBuyer.handleBlur}
                        placeholder="Enter Product Price"
                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                    />
                    {/* {formikBuyer.touched.phoneNumber && formikBuyer.errors.phoneNumber ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formikBuyer.errors.phoneNumber}</div></span> : null} */}
                </div>
                <div>
                    <label for="file-upload" className="custom-file-upload" >
                        <AddPhotoAlternateIcon sx={{ marginTop: "5px" }} /> Upload Product Image
                    </label>
                    <input id="file-upload" name="productImage" type="file" />
                </div>
            </Grid>
        </Grid>
    )
};

export default AddProduct;