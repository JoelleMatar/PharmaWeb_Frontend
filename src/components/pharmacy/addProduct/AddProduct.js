import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import React, { useState } from "react";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import ProductIngredient from "./drug-ingredient.json";
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import Button from "@mui/material/Button";
import { createProduct } from "../../../api";
import { useNavigate } from "react-router";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddProduct = () => {
    const navigate = useNavigate();
    const [dosage, setDosage] = useState([]);
    const [formProduct, setForm] = useState([]);
    const [ingredient, setIngredient] = useState([]);
    const [openSnack, setOpenSnack] = useState(false);
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

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
    ];

    const addProductSchema = Yup.object({
        productName: Yup.string().required("Product Name is required"),
        price: Yup.string().required("Price is required"),
        quantity: Yup.string().required("Quantity is required"),
        stock: Yup.string().required("Stock is required"),
    });

    const formik = useFormik({
        initialValues: {
            productName: '',
            price: 0,
            quantity: 0,
            stock: 0,
        },
        validationSchema: addProductSchema,
        onSubmit: (values) => {
            console.log("VALUES SUBMIT", values);
            handleAddProductSubmit(values)
        }
    });

    const handleAddProductSubmit = async (values) => {
        // setLoading(true)
        console.log("valuesss submit", values)

        const form = {
            productName: values.productName,
            price: values.price,
            quantity: values.quantity,
            stock: values.stock,
        }
        if (formProducts.length === 0) return alert("Please select form");
        if (ingredient.length === 0) return alert("Please select ingredients");


        console.log("formProductssssssssssssssssssssss", formProducts)
        form.dosage = dosage;
        form.form = formProducts;
        form.ingredient = ingredient;
        form.image = image;

        console.log("HELLLLLLOOOOOOOOOOOOOOOOOOOOOOO", form);

        try {
            const success = await createProduct(form);
            console.log("succ", success);
            if (success.status === 201) {

                setOpenSnack(true);
                setTimeout(() => {
                    navigate("/pharmacy/products");
                }, 2000)

            }
        }
        catch (error) {
            console.log("error", error);
        }

    };

    console.log("formik", formik);

    const handleDosageChange = (event, value) => {
        setDosage(value);
    };
    console.log("dosage", dosage);


    const handleFormChange = (event, value) => {
        // console.log("value", value);
        setForm(value);
    };

    const formProducts = [];
    formProduct.map(item => {
        formProducts.push(item.name)
    })

    console.log("formsss", formProducts);

    const handleIngredientChange = (event, value) => {
        // console.log("value", value);
        setIngredient(value);
    };
    console.log("ingredients", ingredient);

    const onChangeImage = e => {
        if (e.target.name === 'image') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result)
                    setImage(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <form onSubmit={formik.handleSubmit}>
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
                            value={formik.values.productName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Product Name"
                            sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                        />
                        {formik.touched.productName && formik.errors.productName ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.productName}</div></span> : null}
                    </div>
                    <div>
                        {/* <TextField
                        id="outlined-required"
                        label="Dosage"
                        type={'text'}
                        name="dosage"
                        // value={formik.values.lastName}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        placeholder="Enter Product Dose"
                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                    /> */}
                        {/* {formik.touched.lastName && formik.errors.lastName ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.lastName}</div></span> : null} */}

                        <Autocomplete
                            multiple
                            id="tags-filled"
                            sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                            options={dosage}
                            onChange={(event, value) => handleDosageChange(event, value)}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Dosage"
                                    placeholder="Dosage"
                                    name="dosage"
                                    // onChange={handleDosageChange}
                                    value={dosage}
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
                        // value={formik.values.phoneNumber}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        placeholder="Enter Product Form"
                        sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                    /> */}
                        {/* {formik.touched.phoneNumber && formik.errors.phoneNumber ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.phoneNumber}</div></span> : null} */}
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            sx={{ width: '80%', marginTop: '30px', marginBottom: '10px' }}
                            options={productFormTypes}
                            onChange={(event, value) => handleFormChange(event, value)}
                            getOptionLabel={(productFormTypes) => productFormTypes.name}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Product Form"
                                    placeholder="Product Form"
                                    name="form"
                                    value={formProduct}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            sx={{ width: '80%', marginTop: '30px', marginBottom: '10px' }}
                            options={ProductIngredient.map((option) => option.Ingredient)}
                            defaultValue={[ProductIngredient[13].Ingredient]}
                            onChange={(event, value) => handleIngredientChange(event, value)}
                            freeSolo
                            // renderTags={(value, getTagProps) =>
                            //     value.map((option, index) => (
                            //         <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            //     ))
                            // }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Product Ingredients"
                                    placeholder="Product Ingredients"
                                    name="ingredient"
                                    value={ingredient}
                                />
                            )}
                        />
                    </div>
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Stock"
                            type={'number'}
                            name="stock"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Product Stock"
                            sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                        />
                        {formik.touched.stock && formik.errors.stock ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.stock}</div></span> : null}
                    </div>
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Quantity"
                            type={'number'}
                            name="quantity"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter maximum quantity to be sold"
                            sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                        />
                        {formik.touched.quantity && formik.errors.quantity ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.quantity}</div></span> : null}
                    </div>

                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Price"
                            type={'number'}
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Product Price"
                            sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                        />
                        {formik.touched.price && formik.errors.price ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.price}</div></span> : null}
                    </div>
                    <div>
                        <label for="file-upload" className="custom-file-upload" >
                            <AddPhotoAlternateIcon sx={{ marginTop: "5px" }} /> Upload Product Image
                        </label>
                        <input id="file-upload" name="image" type="file" accept="images/*" onChange={onChangeImage} />
                        {
                            imagePreview ? <div style={{ width: "200px", height: "200px", marginTop: '-70px', marginBottom: '100px' }}><img src={imagePreview} key={imagePreview} alt="Images Preview" className="mt-3 mr-2" width="100%" height="100%" /></div> : null
                        }

                    </div>

                </Grid>
                <Grid item md={12} sm={12} xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button type="submit" variant="contained" sx={{ width: '30%', marginTop: '70px', backgroundColor: '#00B8B0' }} className="button" >Create Product</Button>
                </Grid>

                <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Product added successfully!
                    </Alert>
                </Snackbar>

            </Grid>
        </form>
    )
};

export default AddProduct;