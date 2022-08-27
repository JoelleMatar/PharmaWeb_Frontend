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
import StripeComponent from '../../components/stripe/StripeComponent';

import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const PayOnlinePopup = ({ open, close, payCredit }) => {
    const [cart, setCart] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem("profile"));
    const pharmacyList = [];
    const navigate = useNavigate()

    const [products, setProducts] = useState([]);
    const [prescription, setPrescription] = useState("");

    console.log("payCreditttttttt", payCredit)

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

            console.log("presss", presc)

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

    const [stripeonline, setStripeOnline] = useState(false);
    // const [amount, setAmount] = useState(0)
    var amount = 0
    const [amountToPay, setAmount] = useState(0)
    const stripedialog = () => {
        amount = 0
        cart.filter(cartitem => payCredit.includes(cartitem._id)).map(order => {
            amount += order.totalPrice
        })

        console.log("amount", amount)
        setAmount(amount)
        setStripeOnline(true)

    }
    console.log("amountttttt", amount)

    const CURRENCY = 'USD';

    const successPayment = (data) => {
        payCredit.map(async(id) => {
            console.log("id", id)
           const updateStatus = await updateOrderStatus(id, {status: 2});
           
        })

        window.location.reload()

    };

    const errorPayment = data => {
        alert('Payment Error');
    };

    cart.filter(cartitem => payCredit.includes(cartitem._id)).map(order => {
        amount += order.totalPrice
    })

    const values = {
        email: loggedUser.email,
        phoneNumber: loggedUser.phoneNumber,
        firstName: loggedUser.firstName,
        lastName: loggedUser.lastName,
        amount: amount
    }

    const onToken = (amount) => token =>
        axios.post('http://localhost:5000/carts/stripe/pay', values)
            .then(successPayment)
            .catch(errorPayment);



    console.log("cart", cart, pharmacyList, products)


    return (
        <>

            <Dialog
                open={open}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"

            >
                <DialogTitle id="alert-dialog-title">
                    {"Pay These Products Online"}
                </DialogTitle>
                <DialogContent>

                    {
                        cart.filter(cartitem => payCredit.includes(cartitem._id)).map(order => {
                            console.log("hii", order, payCredit.includes(order._id))
                            return (
                                <div>
                                    <DialogContentText id="alert-dialog-description">
                                        {
                                            products?.filter(product => {
                                                return product._id === order.productId
                                            })
                                                .map(product => {
                                                    return (
                                                        <Card sx={{ display: 'flex', marginBottom: '20px', boxShadow: ' 0px 2px 0px 2px #cccccc' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                <CardMedia
                                                                    component="img"
                                                                    sx={{ width: 100, marginTop: 0 }}
                                                                    image={product?.image}
                                                                    alt={product.productName}
                                                                />
                                                            </div>

                                                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                                <Grid container>
                                                                    <Grid item md={6} sm={6} xs={6}>
                                                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                                                            <Typography component="div" variant="h5">
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
                                                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                                                            {
                                                                                product?.category ? (
                                                                                    <div>
                                                                                        {
                                                                                            order.prescription === '' ? (
                                                                                                <Grid container>
                                                                                                    
                                                                                                    <label htmlFor="file-upload" className="custom-file-upload" >
                                                                                                        <DriveFolderUploadIcon sx={{ marginTop: "5px" }} /> Upload Doctor Prescription
                                                                                                    </label>
                                                                                                    <input id="file-upload" name="prescription" type="file" accept="image/jpeg, image/png,application/pdf,application/msword,.docx" onChange={(e) => handlePrescription(e, cart._id)} />
                                                                                                </Grid>
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

                                                                    <Grid item md={1} sm={1} xs={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, cursor: 'pointer' }} onClick={() => deleteOrder(order._id)}>
                                                                            <DeleteIcon sx={{ color: 'red' }} />
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </Card>
                                                    )
                                                })
                                        }
                                    </DialogContentText>
                                </div>
                            )
                        })
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    {/* <Button onClick={() => stripedialog()} autoFocus>
                        Pay
                    </Button> */}

                    <StripeCheckout
                        amount={amountToPay}
                        token={onToken(amountToPay)}
                        currency={CURRENCY}
                        stripeKey={'pk_test_51LYvvbHSfpRXz0HozfDd6b00Fww5vLrczomlxHhkuTcJ9hGnS36UUnsc0jmUVrHv2hDqAxDeR7xzuC6eMbqCuWHv00Xgr3D9Xp'}
                    />
                </DialogActions>
            </Dialog>

            {/* {
                stripeonline == true ? <StripeComponent amount={amountToPay} /> : ''
            } */}

        </>
    )
}

export default PayOnlinePopup