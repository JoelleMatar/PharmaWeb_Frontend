import * as React from 'react';
import { useEffect, useState } from "react";
import Navbar from '../../components/navbar/Navbar';
// import ShoppingCartItem from '../../components/shoppingCartItem/ShoppingCartItem';
import Grid from '@mui/material/Grid';

import { getCustomerCartUnconfirmed, updateOrderStatus } from '../../api';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { getProducts, updateOrderPrescription, deleteOrderItem } from "../../api";
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PayProductOnline from './PayProductOnline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PayOnlinePopup from './PayOnlinePopup';
import AddTaskIcon from '@mui/icons-material/AddTask';

const CartPharmacies = ({ navigation }) => {
    const [cart, setCart] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem("profile"));
    const pharmacyList = [];
    const navigate = useNavigate()

    const [products, setProducts] = useState([]);
    const [prescription, setPrescription] = useState("");

    const [paylist, setPayList] = useState([])
    const handlePrescription = async (event, cartId) => {
        // setPrescription([{ prescription: event.target.files[0], loaded: 0 }])
        // setFileName(event.target.files[0].name);
        console.log("prodid", cartId)
        if (event.target.name === 'prescription') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPrescription(reader.result)
                }
            }

            reader.readAsDataURL(event.target.files[0])

            const presc = {
                cartId: cartId,
                prescription: prescription
            }


            try {
                const req = await updateOrderPrescription(presc);

                if (req.data.success === true) {
                    // setShowFileName(true);
                }
            }
            catch (error) {
                console.log("error", error)
            }
        }
    }

    useEffect(async () => {
        const result = await getCustomerCartUnconfirmed(loggedUser._id);
        setCart(result?.data?.data);

        const productlist = [];
        const prods = await getProducts();
        // console.log("prods", prods)
        prods && prods?.data?.data?.map(prod => {
            // console.log("hii", prod)
            result?.data?.data?.map(cartitem => {
                if (cartitem.productId === prod._id) {
                    // console.log("hii", cartitem)
                    productlist.push(prod);
                }
            })
        })



        setProducts(productlist);
    }, []);

    const deleteOrder = async (id) => {
        const deleteItem = await deleteOrderItem(id);

        // console.log("deleteItem", deleteItem)
        if (deleteItem.data.success == true) {
            window.location.reload();
        }

    }


    var payCredit = [];
    const payOnline = (e, cartId) => {
        // debugger;
        console.log("e", e, cartId)

        if (e == true) {
            payCredit.push(cartId)
            console.log("payCredit", payCredit)
        }
        else if (e == false && payCredit.includes(cartId)) {
            console.log("payCredit.indexOf(cartId)", payCredit.indexOf(cartId))
            payCredit.splice(payCredit.indexOf(cartId), 1)
            console.log("payCredit splice", payCredit)

        }
        console.log("PayCreditlist", payCredit)
        setPayList(payCredit => [...payCredit, cartId])
    }


    console.log("cart", cart, pharmacyList, products)

    const [pay, setPay] = useState(false);

    const goToPayOnline = () => {
        setPay(true)
        navigate('/home/pay-online', { payCredit: { payCredit } })
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log("openn", paylist)
    };

    const closeDialog = () => {
        setOpen(false);
    }

    const updateStatus = async(id) => {
       const res = await updateOrderStatus(id, {status: 2});

       if(res.status == 200) window.location.reload()
    }

    return (
        <>
            <Navbar />
            <Grid item md={12} sm={12} xs={12} sx={{ paddingTop: "120px", textAlign: 'left', marginLeft: '7%' }}>
                <Typography variant="h3" sx={{ color: '#00a49c', fontSize: '2.125rem', fontWeight: '400' }} gutterBottom>
                    Your Items in Cart
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '14px', fontWeight: '400' }} gutterBottom>
                    Check the products with the checkbox next to them then click on the Pay Online Button to pay them online. Or simply press Confirm Product to pay it on delivery.
                </Typography>
            </Grid>
            <div style={{ width: '90%', marginLeft: '7%', marginBottom: '50px' }}>
                {
                    cart.map(data => {
                        return (
                            !pharmacyList.includes(data.pharmacyName) ? (
                                pharmacyList.push(data.pharmacyName),
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                        <Typography variant='h5'  sx={{color: '#003633'}}><b>{data.pharmacyName}</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            cart.filter(data2 => data2.pharmacyName == data.pharmacyName).map(order => {
                                                return (
                                                    <div>
                                                        {
                                                            products?.filter(product => {
                                                                return product._id === order.productId
                                                            })
                                                                .map(product => {
                                                                    return (
                                                                        <Grid container>
                                                                            {
                                                                                order.pharmacyPaymentOptions.includes('Credit Card') ? (
                                                                                    <Grid item md={1} sm={1} xs={1} sx={{ display: 'flex', marginBottom: '20px', flexDirection: 'column', justifyContent: 'center' }}>
                                                                                        <Checkbox onChange={e => payOnline(e.target.checked, order._id)} />
                                                                                    </Grid>
                                                                                ) : (
                                                                                    <Grid item md={1} sm={1} xs={1} sx={{ display: 'flex', marginBottom: '20px', flexDirection: 'column', justifyContent: 'center' }}>
                                                                                    </Grid>
                                                                                )
                                                                            }
                                                                            <Grid item md={11} sm={11} xs={11}>
                                                                                <Card sx={{ display: 'flex', marginBottom: '20px', boxShadow: ' 0px 2px 0px 2px #cccccc' }}>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                                        <CardMedia
                                                                                            component="img"
                                                                                            sx={{ width: 100, marginTop: 0, marginLeft: '10px' }}
                                                                                            image={product?.image}
                                                                                            alt={product.productName}
                                                                                        />
                                                                                    </div>

                                                                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                                                        <Grid container>
                                                                                            <Grid item md={5} sm={5} xs={5}>
                                                                                                <CardContent sx={{ flex: '1 0 auto' }}>
                                                                                                    <Typography component="div" variant="h5" sx={{color: '#003633'}}>
                                                                                                        {product.productName}
                                                                                                    </Typography>
                                                                                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                                                        Quantity: {order.quantity}
                                                                                                    </Typography>
                                                                                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                                                        Price: {product.price}L.L.
                                                                                                    </Typography>
                                                                                                </CardContent>
                                                                                            </Grid>

                                                                                            <Grid item md={5} sm={5} xs={5}>
                                                                                                <CardContent sx={{ flex: '1 0 auto', marginTop: '10px' }}>
                                                                                                    {
                                                                                                        product?.category ? (
                                                                                                            <div>
                                                                                                                {
                                                                                                                    order.prescription === '' ? (
                                                                                                                        <div>
                                                                                                                            <label htmlFor="file-upload" className="custom-file-upload" >
                                                                                                                                <DriveFolderUploadIcon sx={{ marginTop: "5px" }} /> Upload Doctor Prescription
                                                                                                                            </label>
                                                                                                                            <input id="file-upload" name="prescription" type="file" accept="image/jpeg, image/png,application/pdf,application/msword,.docx" onChange={(e) => handlePrescription(e, cart._id)} />
                                                                                                                        </div>
                                                                                                                    ) : (
                                                                                                                        null
                                                                                                                    )
                                                                                                                }
                                                                                                            </div>
                                                                                                        ) : (
                                                                                                            <div></div>
                                                                                                        )
                                                                                                    }
                                                                                                </CardContent>
                                                                                            </Grid>
                                                                                            
                                                                                            <Grid item md={2} sm={2} xs={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                <Box sx={{  pl: 1, pb: 1, cursor: 'pointer' }}>
                                                                                                    <DeleteIcon sx={{ color: 'red', marginRight: '20px'}}  onClick={() => deleteOrder(order._id)} />
                                                                                                    <AddTaskIcon sx={{ color: '#00B8B0' }} onClick={() => updateStatus(order._id)} />
                                                                                                </Box>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Box>
                                                                                </Card>
                                                                            </Grid>

                                                                        </Grid>
                                                                    )
                                                                }
                                                                )
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </AccordionDetails>
                                </Accordion>
                            ) : (
                                <>
                                </>
                            )
                        )
                    })
                }
            </div>
            <Button variant="contained" disabled={!paylist.length} className='btnAdd' sx={{ width: '80%', height: '40px', marginTop: '20px', marginBottom: '20px', backgroundColor: '#00B8B0', marginLeft: '10%' }} onClick={() => handleClickOpen()} >Pay Online</Button>

            <PayOnlinePopup open={open} close={closeDialog} payCredit={paylist} />


        </>
    )
}

export default CartPharmacies