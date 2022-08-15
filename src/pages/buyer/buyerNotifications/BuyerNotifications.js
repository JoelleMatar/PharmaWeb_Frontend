import Navbar from "../../../components/navbar/Navbar"
import "./BuyerNotifications.css"
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { getBuyerDonatedDrugs, getBuyerNotification, getBuyerNotifications, getPharmacyNotification, getPharmacyNotifications, getPharmacyRequestedDrugs, getUser, getUsers, updateBuyerIsReadNotif, updateIsReadNotif } from '../../../api/index';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const BuyerNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [notification, setNotification] = useState([]);
    const [donateDrug, setDonateDrug] = useState([]);
    const [user, setUser] = useState([]);
    const [readnot, setreadnot] = useState(false);

    useEffect(async () => {
        const result = await getBuyerNotifications();
        setNotifications(result.data);


    }, [notification]);

    console.log("notifications", notifications);

    const readNotif = async (notif) => {

        try {
            const updatenotif = await updateBuyerIsReadNotif(notif._id);

            if (updatenotif) {
                const result = await getBuyerNotifications();
                setNotifications(result.data);

                const notifi = await getBuyerNotification(notif._id);
                setNotification(notifi.data.data[0]);

                console.log("notifi", notifi)

                const reqd = await getBuyerDonatedDrugs(notifi?.data?.data[0]?.donateDrugId);
                setDonateDrug(reqd.data.data[0]);

                console.log("reqddd", reqd?.data?.data[0])

                // const userReq = await getUser(reqd?.data?.data[0]?.userId);
                // setUser(userReq.data.data[0]);

            }
            setreadnot(true);
            console.log("testet", notification, donateDrug, user)

        }
        catch (err) {
            console.log("err", err)
        }
        console.log("notif", notif)
    }


    return (
        <div style={{ overflow: 'hidden' }}>
            <Navbar />

            <Grid container sx={{ marginTop: '120px', marginLeft: '50px' }}>
                <Grid item md={3} sm={3} sx={3} height='80vh'>
                    <List sx={{ width: '100%', height: '100%', paddingTop: '0', maxWidth: 360, bgcolor: 'background.paper', overflowY: 'scroll' }}>
                        {
                            notifications?.data?.map(notification => {
                                return (
                                    <div>
                                        {
                                            notification.isRead ? (
                                                <div>
                                                    {
                                                        notifications?.donatedDrug?.filter(donatedrug => {
                                                            return donatedrug._id === notification.donateDrugId
                                                        })
                                                            .map(donatedrug => {
                                                                return (
                                                                    <div>
                                                                        <ListItem alignItems="flex-start" sx={{ cursor: 'pointer', backgroundColor: 'white' }} onClick={() => readNotif(notification)}>
                                                                            <ListItemAvatar>
                                                                                <Avatar alt={donatedrug.fullName} src="/static/images/avatar/1.jpg" />
                                                                            </ListItemAvatar>
                                                                            <ListItemText
                                                                                primary={"Requested Product " + donatedrug.productName}
                                                                                secondary={
                                                                                    <React.Fragment>
                                                                                        <Typography
                                                                                            sx={{ display: 'inline' }}
                                                                                            component="span"
                                                                                            variant="body2"
                                                                                            color="text.primary"
                                                                                        >
                                                                                            {donatedrug.fullName}
                                                                                        </Typography>
                                                                                    </React.Fragment>
                                                                                }
                                                                            />

                                                                        </ListItem>
                                                                        <Divider variant="inset" component="li" />
                                                                    </div>
                                                                )
                                                            })
                                                    }
                                                </div>
                                            ) : (
                                                <div>
                                                    {
                                                        notifications?.donatedDrug?.filter(donatedrug => {
                                                            return donatedrug._id === notification.donateDrugId
                                                        })
                                                            .map(donatedrug => {
                                                                return (
                                                                    <div>
                                                                        <ListItem alignItems="flex-start" sx={{ cursor: 'pointer', backgroundColor: '#f5f5f5' }} onClick={() => readNotif(notification)}>
                                                                            <ListItemAvatar>
                                                                                <Avatar alt={donatedrug.fullName} src="/static/images/avatar/1.jpg" />
                                                                            </ListItemAvatar>
                                                                            <ListItemText
                                                                                primary={"Requested Product " + donatedrug.productName}
                                                                                secondary={
                                                                                    <React.Fragment>
                                                                                        <Typography
                                                                                            sx={{ display: 'inline' }}
                                                                                            component="span"
                                                                                            variant="body2"
                                                                                            color="text.primary"
                                                                                        >
                                                                                            {donatedrug.fullName}
                                                                                        </Typography>
                                                                                    </React.Fragment>
                                                                                }
                                                                            />

                                                                        </ListItem>
                                                                        <Divider variant="inset" component="li" />
                                                                    </div>
                                                                )
                                                            })
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            })


                        }

                    </List>
                </Grid>
                <Grid item md={9} sm={9} sx={9}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 1000,
                                height: 600,
                            },
                        }}
                    >
                        <Paper elevation={2} sx={{ padding: '40px' }} >
                            <Typography component="div" variant="h5" sx={{ color: '#ffa26c', marginBottom: '25px' }}  >
                                <b>Notification:</b>
                            </Typography>

                            {
                                readnot ? (
                                    <Grid container>
                                        <Typography component="div" variant="h6">
                                            <b>{donateDrug?.fullName}</b> is donating <b>{donateDrug?.productName}</b>
                                            {
                                                donateDrug?.message ? (
                                                    <span> and has sent this message: <i>{donateDrug?.message}</i></span>
                                                ) : (<div></div>)
                                            }
                                        </Typography>
                                        <div></div>
                                        <Typography component="div" variant="h6" sx={{ marginTop: '25px', fontSize: '15px' }}  >
                                            For more information, contact <b>{donateDrug?.fullName}</b> via:
                                            <br />
                                            <div style={{ textAlign: 'left', justifyContent: 'space-between', display: 'flex' }}>

                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', float: 'left', marginBottom: '10px' }}><PhoneIcon sx={{ marginRight: '10px' }} /> {donateDrug?.phone}</div> <br />
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', textAlign: 'left' }}><EmailIcon sx={{ marginRight: '10px' }} /> {donateDrug?.email}</div>

                                            </div></Typography>
                                    </Grid>
                                ) : (
                                    <div>

                                    </div>
                                )
                            }
                        </Paper>
                    </Box>
                </Grid>

            </Grid>
        </div>
    )
}

export default BuyerNotifications