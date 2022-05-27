import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { getPharmacyNotifications, getPharmacyRequestedDrugs, getUser, getUsers } from '../../../api';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';

export default function Notification() {
    const [notifications, setNotifications] = useState([]);

    useEffect(async () => {
        const result = await getPharmacyNotifications();
        setNotifications(result.data);


    }, []);

    console.log("notifications", notifications);

    const readNotif = (notif) => {
        notif.isRead = true;
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
                                                                                        <ListItem alignItems="flex-start" sx={{ cursor: 'pointer' }} onClick={() => readNotif(notification)}>
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
                    <Paper elevation={2} />
                </Box>
            </Grid>

        </Grid>

    );
}