import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import React, { useEffect, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from "@mui/material/Button";
import { createProduct, getProductsLebanon, getCategories } from "../../../api";
import { useNavigate } from "react-router";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import "./AddProduct.css";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddProduct = () => {
    const navigate = useNavigate();
    const [dosage, setDosage] = useState([]);
    const [formProduct, setForm] = useState([]);
    const [ingredient, setIngredient] = useState([]);
    const [openSnack, setOpenSnack] = useState(false);
    const [openSnack2, setOpenSnack2] = useState(false);
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [productLeb, setProductsLeb] = useState([]);
    const [productSel, setProductSel] = useState("");
    const [selectedProduct, setSelectedProduct] = useState([]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const [category, setCategory] = React.useState('');
    const [categories, setCategories] = React.useState([]);
    const [prodCatId, setProdCatId] = useState('')
    const handleChangeCategories = (event) => {
        setCategory(event.target.innerText);

        categories?.filter(c => c.name === event.target.innerText).map(cat => {
            setProdCatId(cat._id)
        })
        console.log("hiiiii", category, event.target.innerText, prodCatId)
    };
    console.log("sss", prodCatId)
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

    useEffect(async () => {
        const res = await getProductsLebanon();
        const cats = await getCategories();


        setProductsLeb(res.data.data);
        setCategories(cats.data.data)
    }, [])
    // console.log("products lebbb", productLeb, categories);

    const loggedUser = JSON.parse(localStorage.getItem('profile'));
    // console.log("loggedUser", loggedUser._id);

    const addProductSchema = Yup.object({
        // productName: Yup.string().required("Product Name is required"),
        price: Yup.string().required("Price is required"),
        quantity: Yup.string().required("Quantity is required"),
        stock: Yup.string().required("Stock is required"),
        category: Yup.boolean().required("Category is required"),
    });

    const formik = useFormik({
        initialValues: {
            price: 0,
            quantity: 0,
            stock: 0,
            description: '',
            category: false,
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
            price: values.price,
            quantity: values.quantity,
            stock: values.stock,
            description: values.description,
            category: values.category,
            pharmaId: loggedUser?._id,
            // prodCatId: values.prodCatId
        }
        if (formProduct.length === 0) return alert("Please select form");
        if (productSel === '') return alert("Please select product name");
        // if (ingredient.length === 0) return alert("Please select ingredients");


        console.log("formProductssssssssssssssssssssss", formProduct)
        form.dosage = selectedProdDosage;
        form.productName = productSel;
        form.form = formProduct;
        form.ingredient = selectedProdIngredients;
        form.image = image;
        form.prodCatId = prodCatId;
        form.code = selectedProdCode == '' ? '-' : selectedProdCode;
        form.agent = selectedProdAgent;
        form.laboratory = selectedProdLab;
        form.country = selectedProdCountry;

        console.log("HELLLLLLOOOOOOOOOOOOOOOOOOOOOOO", form.prodCatId, form);

        try {
            const success = await createProduct(form);
            console.log("succ", success);
            if (success.status === 201) {

                setOpenSnack(true);
                setTimeout(() => {
                    navigate("/pharmacy/products");
                }, 2000)

            }
            else if (success.status === 400) {

                setOpenSnack2(true);

            }
        }
        catch (error) {
            console.log("error", error);
        }

    };

    // console.log("formik", formik);

    const handleDosageChange = (event, value) => {
        setDosage(value);
    };
    // console.log("dosage", dosage);


    const handleFormChange = (event, value) => {
        // console.log("value formmmmmm", value);
        setForm(value);
    };

    const [selectedProdDosage, setselectedProdDosage] = useState("");
    const [selectedProdLab, setselectedProdLab] = useState("");
    const [selectedProdCountry, setselectedProdCountry] = useState("");
    const [selectedProdForm, setselectedProdForm] = useState([]);
    const [selectedProdIngredients, setselectedProdIngredients] = useState([]);
    const [selectedProdAgent, setselectedProdAgent] = useState("");
    const [selectedProdCode, setselectedProdCode] = useState("");

    const handleProductChange = (event, value, cat) => {
        console.log("value", event, value);

        if (category == 'Drugs' && cat == 'drugs') {
            setProductSel(value.productName);

            setSelectedProduct(value);

            setselectedProdDosage(value.dosage[0]);
            setselectedProdForm(value.form);
            setselectedProdIngredients(value.ingredient);
            setselectedProdLab(value.laboratory);
            setselectedProdCountry(value.country);
            setselectedProdAgent(value.agent);
            setselectedProdCode(value.code);
        } else {
            if (cat == 'lab') setSelectedProduct(event.target.innerText);
            if (cat == 'form') setselectedProdForm(event.target.innerText);
            if (cat == 'ingredients') setselectedProdIngredients(event.target.innerText);
            if (cat == 'country') setselectedProdCountry(event.target.innerText);
            if (cat == 'agent') setselectedProdAgent(event.target.innerText);
            if (cat == 'code') setselectedProdCode(event.target.innerText);
            if (cat == 'dosage') setselectedProdDosage(event.target.innerText);
            if (cat == 'product') setProductSel(event.target.innerText);
        }

    };

    console.log("selectedProduct", selectedProduct, selectedProdForm, selectedProdForm, selectedProdIngredients)
    const formProducts = [];
    // formProduct.map(item => {
    //     formProducts.push(item.name)
    // })

    // console.log("formsss", formProducts);

    const handleIngredientChange = (event, value) => {
        // console.log("value", value);
        setIngredient(value);
    };
    // console.log("ingredients", ingredient);

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
        <form onSubmit={formik.handleSubmit} >
            <Typography variant="h4" sx={{ marginBottom: '20px', color: '#00a49c',  }}>Add New Product</Typography>
            <Grid container sx={{ textAlign: 'center' }}>
                <Grid item md={6} sm={6} xs={12} sx={{ textAlign: 'center' }}>
                    <div>
                        <Autocomplete
                            id="tags-outlined"
                            sx={{ width: '95%', marginTop: '20px', marginBottom: '10px' }}
                            options={categories}
                            onChange={(event, value) => handleChangeCategories(event, value)}
                            getOptionLabel={(cat) => cat.name}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Product Category"
                                    placeholder="Product Category"
                                    name="prodCatId"
                                    value={category}
                                    key={params._id}
                                />
                            )}
                        />
                    </div>
                    {
                        category == 'Drugs' ? (
                            <div>
                                <div>
                                    <Autocomplete
                                        id="tags-outlined"
                                        sx={{ width: '95%', marginTop: '20px', marginBottom: '10px' }}
                                        options={productLeb}
                                        onChange={(event, value) => handleProductChange(event, value, 'drugs')}
                                        getOptionLabel={(prod) => prod.productName}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Product Name"
                                                placeholder="Product Name"
                                                name="productName"
                                                value={productSel}
                                                key={params._id}
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Grid container>
                                        <Grid item md={6} sm={6} xs={6}>
                                            <TextField
                                                id="outlined-read-only-input"
                                                sx={{ width: '95%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                                label="Laboratory Name"
                                                value={selectedProdLab}
                                                InputLabelProps={{ shrink: true }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={6}>
                                            <TextField
                                                id="outlined-read-only-input"
                                                sx={{ width: '90%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                                label="Country of Origin"
                                                value={selectedProdCountry}
                                                InputLabelProps={{ shrink: true }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>


                                </div>

                                <div>
                                    <Grid container>
                                        <Grid item md={3} sm={3} xs={6}>
                                            <TextField
                                                id="outlined-read-only-input"
                                                sx={{ width: '90%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                                label="Dosage"
                                                placeholder="Dosage"
                                                value={selectedProdDosage}
                                                InputLabelProps={{ shrink: true }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item md={9} sm={9} xs={6}>
                                            <Autocomplete
                                                id="tags-outlined"
                                                sx={{ width: '93%', marginTop: '20px', marginBottom: '10px' }}
                                                options={selectedProdForm}
                                                value={selectedProdForm[0]}
                                                onChange={(event, value) => handleFormChange(event, value)}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Form" name="form" value={formProduct} placeholder="Form" />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                </div>
                                <div>

                                    <Autocomplete
                                        multiple
                                        id="tags-readOnly"
                                        sx={{ width: '95%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                        options={selectedProdIngredients}
                                        value={selectedProdIngredients}
                                        readOnly
                                        renderInput={(params) => (
                                            <TextField {...params} InputLabelProps={{ shrink: true }} label="Ingredients" />
                                        )}
                                    />

                                </div>

                                <div>
                                    <label for="file-upload" className="custom-file-upload" style={{ width: '95%', marginTop: '20px', marginBottom: '10px', float: 'left' }}>
                                        <AddPhotoAlternateIcon sx={{ marginTop: "5px" }} /> Upload Product Image
                                    </label>
                                    <input id="file-upload" name="image" type="file" accept="images/*" onChange={onChangeImage} />
                                    {
                                        imagePreview ? <div style={{ width: "200px", height: "200px", marginTop: '-70px', marginBottom: '100px' }}><img src={imagePreview} key={imagePreview} alt="Images Preview" className="mt-3 mr-2" width="100%" height="100%" /></div> : null
                                    }

                                </div>

                            </div>
                        ) : (
                            <div>
                                <div>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Product Name"
                                        placeholder="Product Name"
                                        name="productName"
                                        value={productSel}
                                        onChange={(event, value) =>  setProductSel(event.target.value)}
                                        // onBlur={formik.handleBlur}
                                        sx={{ width: '95%', marginTop: '20px', marginBottom: '10px', marginLeft: '-4%' }}
                                    />
                                </div>
                                <div>
                                    <Grid container>
                                        <Grid item md={6} sm={6} xs={6}>
                                            {/* <TextField
                                                id="outlined-read-only-input"
                                                sx={{ width: '95%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                                label="Laboratory Name"
                                                value={selectedProdLab}
                                                InputLabelProps={{ shrink: true }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            /> */}

                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Laboratory Name"
                                                placeholder="Laboratory Name"
                                                // name="productName"
                                                value={selectedProdLab}
                                                onChange={(event, value) => setselectedProdLab(event.target.value)}
                                                // onBlur={formik.handleBlur}
                                                sx={{ width: '95%', marginTop: '20px', marginBottom: '10px', marginLeft: '-3%' }}
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={6}>
                                            {/* <TextField
                                                id="outlined-read-only-input"
                                                sx={{ width: '90%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                                label="Country of Origin"
                                                value={selectedProdCountry}
                                                InputLabelProps={{ shrink: true }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            /> */}

                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Country of Origin"
                                                placeholder="Country of Origin"
                                                // name="productName"
                                                value={selectedProdCountry}
                                                onChange={(event, value) => setselectedProdCountry(event.target.value)}
                                                // onBlur={formik.handleBlur}
                                                sx={{ width: '90%', marginTop: '20px', marginBottom: '10px', marginLeft: '-4%' }}
                                            />
                                        </Grid>
                                    </Grid>


                                </div>

                                <div>
                                    <Grid container>
                                        <Grid item md={3} sm={3} xs={6}>
                                            {/* <TextField
                                                id="outlined-read-only-input"
                                                sx={{ width: '90%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                                label="Dosage"
                                                placeholder="Dosage"
                                                value={selectedProdDosage}
                                                InputLabelProps={{ shrink: true }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            /> */}
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Dosage"
                                                placeholder="Dosage"
                                                // name="productName"
                                                value={selectedProdDosage}
                                                onChange={(event, value) => setselectedProdDosage(event.target.value)}
                                                // onBlur={formik.handleBlur}
                                                sx={{ width: '90%', marginTop: '20px', marginBottom: '10px' }}
                                            />
                                        </Grid>
                                        <Grid item md={9} sm={9} xs={6}>
                                            {/* <Autocomplete
                                                id="tags-outlined"
                                                sx={{ width: '93%', marginTop: '20px', marginBottom: '10px' }}
                                                options={selectedProdForm}
                                                value={selectedProdForm[0]}
                                                onChange={(event, value) => handleFormChange(event, value)}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Form" name="form" value={formProduct} placeholder="Form" />
                                                )}
                                            /> */}
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Form"
                                                placeholder="Form"
                                                // name="productName"
                                                value={formProduct}
                                                onChange={(event, value) => setForm(event.target.value)}
                                                // onBlur={formik.handleBlur}
                                                sx={{ width: '90%', marginTop: '20px', marginBottom: '10px', marginLeft: '-3%' }}
                                            />
                                        </Grid>
                                    </Grid>

                                </div>
                                <div>

                                    {/* <Autocomplete
                                        multiple
                                        id="tags-readOnly"
                                        sx={{ width: '95%', marginTop: '20px', marginBottom: '10px', float: 'left' }}
                                        options={selectedProdIngredients}
                                        value={selectedProdIngredients}
                                        readOnly
                                        renderInput={(params) => (
                                            <TextField {...params} InputLabelProps={{ shrink: true }} label="Ingredients" />
                                        )}
                                    /> */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Ingredients"
                                        placeholder="Ingredients"
                                        // name="productName"
                                        value={selectedProdIngredients}
                                        onChange={(event, value) => setselectedProdIngredients(event.target.value)}
                                        // onBlur={formik.handleBlur}
                                        sx={{ width: '95%', marginTop: '20px', marginBottom: '10px', marginLeft: '-2%' }}
                                    />

                                </div>

                                <div>
                                    <label for="file-upload" className="custom-file-upload" style={{ width: '95%',  float: 'left' }}>
                                        <AddPhotoAlternateIcon sx={{ marginTop: "5px" }} /> Upload Product Image
                                    </label>
                                    <input id="file-upload" name="image" type="file" accept="images/*" onChange={onChangeImage} />
                                    {
                                        imagePreview ? <div style={{ width: "200px", height: "200px",  marginBottom: '100px' }}><img src={imagePreview} key={imagePreview} alt="Images Preview" className="mt-3 mr-2" width="100%" height="100%" /></div> : null
                                    }

                                </div>

                            </div>
                        )
                    }

                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <Grid container>
                        <Grid item md={6} sm={6} xs={6}>
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
                                    sx={{ width: '80%', marginTop: '20px', marginBottom: '10px', marginLeft: '55px' }}
                                />
                                {formik.touched.price && formik.errors.price ? <span style={{ fontSize: '15px' }}>  <div style={{ color: 'red' }}>{formik.errors.price}</div></span> : null}
                            </div>
                        </Grid>
                        <Grid item md={6} sm={6} xs={6}>
                            <div style={{ width: '80%', marginTop: '10px', marginBottom: '40px', fontSize: '18px', marginLeft: '40px' }}>
                                <span>High Dose</span>
                                <Switch name="category" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </div>
                        </Grid>
                    </Grid>

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
                            className="price"
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
                            className="qty"
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
                            id="outlined-required"
                            multiline
                            rows={4}
                            label="Description"
                            type={'multiline'}
                            name="description"
                            className="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter description"
                            sx={{ width: '80%', marginTop: '20px', marginBottom: '10px' }}
                        />
                    </div>



                </Grid>
                <Grid item md={12} sm={12} xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button type="submit" variant="contained" sx={{ width: '30%', marginTop: '70px', backgroundColor: '#00B8B0', height: '50px' }} className="btnAdd" >Create Product</Button>
                </Grid>

                <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%', backgroundColor: '#019890' }}>
                        Product added successfully!
                    </Alert>
                </Snackbar>
                <Snackbar open={openSnack2} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        Product already exists!
                    </Alert>
                </Snackbar>

            </Grid>
        </form>
    )
};

export default AddProduct;