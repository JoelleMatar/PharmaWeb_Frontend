import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { getPharmacyNotification, getPharmacyNotifications, getPharmacyRequestedDrugs, getUser, getUsers, updateIsReadNotif } from '../../../api';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [notification, setNotification] = useState([]);
    const [reqDrug, setreqDrug] = useState([]);
    const [user, setUser] = useState([]);
    const [readnot, setreadnot] = useState(false);

    useEffect(async () => {
        const result = await getPharmacyNotifications();
        setNotifications(result.data);


    }, [notification]);

    console.log("notifications", notifications);

    const readNotif = async (notif) => {

        try {
            const updatenotif = await updateIsReadNotif(notif._id);

            if (updatenotif) {
                const result = await getPharmacyNotifications();
                setNotifications(result.data);

                const notifi = await getPharmacyNotification(notif._id);
                setNotification(notifi.data.data[0]);

                console.log("notifi", notifi)

                const reqd = await getPharmacyRequestedDrugs(notifi?.data?.data[0]?.requestdrugId);
                setreqDrug(reqd.data.data[0]);

                console.log("reqddd", reqd?.data?.data[0])

                const userReq = await getUser(reqd?.data?.data[0]?.userId);
                setUser(userReq.data.data[0]);

            }
            setreadnot(true);
            console.log("testet", notification, reqDrug, user)

        }
        catch (err) {
            console.log("err", err)
        }
        console.log("notif", notif)
    }

    return (
        <Grid container>
            <Grid item md={4} sm={4} sx={4} height='80vh'>
                <List sx={{ width: '100%', height: '100%', paddingTop: '0', maxWidth: 360, bgcolor: 'background.paper', overflowY: 'scroll' }}>
                    {
                        notifications?.data?.map(notification => {
                            return (
                                <div>
                                    {
                                        notification.isRead ? (
                                            <div>
                                                {
                                                    notifications?.requestedDrug?.filter(requestdrug => {
                                                        return requestdrug._id === notification.requestdrugId
                                                    })
                                                        .map(requestdrug => {
                                                            return (
                                                                <div>
                                                                    {
                                                                        notifications?.users?.filter(user => {
                                                                            return user._id === requestdrug.userId
                                                                        })
                                                                            .map(user => {
                                                                                return (
                                                                                    <div>
                                                                                        <ListItem alignItems="flex-start" sx={{ cursor: 'pointer', backgroundColor: 'white' }} onClick={() => readNotif(notification)}>
                                                                                            <ListItemAvatar>
                                                                                                <Avatar alt={user.firstName} src="/static/images/avatar/1.jpg" />
                                                                                            </ListItemAvatar>
                                                                                            <ListItemText
                                                                                            sx={{color: '#003633'}}
                                                                                                primary={"Requested Product " + requestdrug.productName}
                                                                                                secondary={
                                                                                                    <React.Fragment>
                                                                                                        <Typography
                                                                                                            sx={{ display: 'inline', color: '#003633' }}
                                                                                                            component="span"
                                                                                                            variant="body2"
                                                                                                            color="#003633"
                                                                                                        >
                                                                                                            {user.firstName} {user.lastName}
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
                                                        })
                                                }
                                            </div>
                                        ) : (
                                            <div>
                                                {
                                                    notifications?.requestedDrug?.filter(requestdrug => {
                                                        return requestdrug._id === notification.requestdrugId
                                                    })
                                                        .map(requestdrug => {
                                                            return (
                                                                <div>
                                                                    {
                                                                        notifications?.users?.filter(user => {
                                                                            return user._id === requestdrug.userId
                                                                        })
                                                                            .map(user => {
                                                                                return (
                                                                                    <div>
                                                                                        <ListItem alignItems="flex-start" sx={{ cursor: 'pointer', backgroundColor: '#f5f5f5' }} onClick={() => readNotif(notification)}>
                                                                                            <ListItemAvatar>
                                                                                                <Avatar alt={user.firstName} src="/static/images/avatar/1.jpg" />
                                                                                            </ListItemAvatar>
                                                                                            <ListItemText
                                                                                                primary={"Requested Product " + requestdrug.productName}
                                                                                                secondary={
                                                                                                    <React.Fragment>
                                                                                                        <Typography
                                                                                                            sx={{ display: 'inline' }}
                                                                                                            component="span"
                                                                                                            variant="body2"
                                                                                                            color="text.primary"
                                                                                                        >
                                                                                                            {user.firstName} {user.lastName}
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
            <Grid item md={8} sm={8} sx={8}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 900,
                            height: 600,
                        },
                    }}
                >
                    <Paper elevation={2} sx={{ padding: '40px' }} >
                        <Typography component="div" variant="h5" sx={{ color: '#00a49c', marginBottom: '25px' }}  >
                            <b>Notification:</b>
                        </Typography>

                        {
                            readnot ? (
                                <Grid container>
                                    <Typography component="div" variant="h6" sx={{color: '#003633'}}>
                                        Customer <b>{user?.firstName} {user?.lastName}</b> has requested <b>{reqDrug?.quantity}</b> items of a product named <b>{reqDrug?.productName}</b>
                                        {
                                            reqDrug?.message ? (
                                                <span> and has sent you this message: <i>{reqDrug?.message}</i></span>
                                            ) : (<div></div>)
                                        }
                                    </Typography>

                                    <Typography component="div" variant="h6" sx={{ marginTop: '25px', fontSize: '15px',color: '#003633' }}  >
                                        For more information, contact <b>{user?.firstName} {user?.lastName}</b> via:
                                        <br />
                                        <div style={{textAlign: 'left', justifyContent:'space-between', display: 'flex'}}>
                                            
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', float: 'left', marginBottom: '10px'}}><PhoneIcon sx={{marginRight: '10px'}} /> { user?.phoneNumber}</div> <br />
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', textAlign: 'left'}}><EmailIcon sx={{marginRight: '10px'}} /> {user?.email}</div>
                                    
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

    );
}