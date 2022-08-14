import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { updateCheckoutStatus } from '../../api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ConfirmOrderDialog({ open, products, close, carts }) {
    const [OpenDialog, setOpenDialog] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openSnack, setOpenSnack] = useState(false);
    console.log("cart items", carts)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };


    const confirmOrder = async () => {
        const formData = [];

        carts.map(cart => {
            formData.push(cart._id)
        })

        const prescription = window.localStorage.getItem('prescription');

        console.log("formData", formData)

        const confirm = await updateCheckoutStatus(formData, prescription);

        console.log("confirm", confirm)
        if (confirm.data.success) {
            window.location.reload();
        } else {
            setOpenSnack(true);
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={close}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Confirm Order"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to purchase all the items in your cart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={close}>
                        No
                    </Button>
                    <Button onClick={() => confirmOrder()} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    You have already purchased an order today, please try again tomorrow!
                </Alert>
            </Snackbar>
        </div>
    );
}
