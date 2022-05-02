import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PharmacyProducts from '../pharmacy/pharmcyProducts.js/PharmacyProducts';
import { ListItem, List } from '@mui/material';
import { useState } from "react";

const MainListItems = () => {
    const [isdashboard, setIsDashboard] = useState(true);
    const [isproducts, setIsProducts] = useState(false);

    const dashboardCheck = () => {
        setIsDashboard(true);
        setIsProducts(false);
        localStorage.setItem('isProducts', false);
        localStorage.setItem('isDashboard', true);
        window.history.pushState({}, null, '/pharmacy/dashboard')
    }

    const productsCheck = () => {
        setIsDashboard(false);
        setIsProducts(true);
        localStorage.setItem('isProducts', true);
        localStorage.setItem('isDashboard', false);
        window.history.pushState({}, null, '/pharmacy/products')
    }

    return (
        <List component="nav" sx={{ paddingLeft: '25px' }}>
            <ListItem onClick={() => dashboardCheck()}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ marginTop: '20px', width: '240px' }} />
            </ListItem>
            <br />
            <ListItem onClick={() => productsCheck()}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Products" sx={{ marginTop: '20px', width: '240px' }} />
            </ListItem>
            <br />
            <ListItem button component="a" href="/pharmacy/products" >
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" sx={{ marginTop: '20px', width: '240px' }} />
            </ListItem>
            <br />
            <ListItem button component="a" href="/pharmacy/products">
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" sx={{ marginTop: '20px', width: '240px' }} />
            </ListItem>
            <br />
            <ListItem button component="a" href="/pharmacy/products">
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Pharmacy Profile" sx={{ marginTop: '20px', width: '240px' }} />
            </ListItem>
        </List>
    )
}

export default MainListItems;


// export const secondaryListItems = (
//     <React.Fragment>
//         <ListSubheader component="div" inset>
//             Saved reports
//         </ListSubheader>
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Current month" />
//         </ListItemButton>
//         <br />
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Last quarter" />
//         </ListItemButton>
//         <br />
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Year-end sale" />
//         </ListItemButton>
//     </React.Fragment>
// );