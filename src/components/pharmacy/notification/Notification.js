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
        
    }

    return (
        <Grid container>
            <Grid item md={4} sm={4} sx={4} height='80vh'>
                <List sx={{ width: '100%', height: '100%', paddingTop: '0',maxWidth: 360, bgcolor: 'background.paper', overflowY: 'scroll' }}>
                    {
                        notifications?.data?.map(notification => {
                            return (
                                <div>
                                    {
                                        notification.isRead ? (
                                            <div>
                                                {
                                                    notifications?.users?.map(user => {
                                                        console.log("salutt", user);
                                                        return (
                                                            <div>
                                                                <ListItem alignItems="flex-start" onClick={() => readNotif(notification)}>
                                                                    <ListItemAvatar>
                                                                        <Avatar alt={user.firstName} src="/static/images/avatar/1.jpg" />
                                                                    </ListItemAvatar>
                                                                    <ListItemText
                                                                        primary="Requesting Product"
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
                                        ) : (
                                            <div>
                                                {
                                                    notifications?.users?.map(user => {
                                                        console.log("salutt", user);
                                                        return (
                                                            <div>
                                                                <ListItem alignItems="flex-start" sx={{backgroundColor: '#f8f8f9'}}>
                                                                    <ListItemAvatar>
                                                                        <Avatar alt={user.firstName} src="/static/images/avatar/1.jpg" />
                                                                    </ListItemAvatar>
                                                                    <ListItemText
                                                                        primary="Requesting Product"
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