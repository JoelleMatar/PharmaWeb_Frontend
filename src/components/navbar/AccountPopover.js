import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';
// material
import { alpha } from '@material-ui/core/styles';
import { IconButton, Button, Box, Divider, Typography, Avatar } from '@mui/material';
// components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const MENU_OPTIONS_BUYER = [
    {
      label: 'Profile',

      linkTo: '/buyer/profile'
    },
    {
      label: 'My Orders',

      linkTo: '/buyer/orders'
    },
    {
      label: 'Notifications',

      linkTo: '/buyer/notifications'
    },
  ];

  const MENU_OPTIONS_PHARMACY = [
    {
      label: 'DASHBOARD',

      linkTo: '/pharmacy/dashboard'
    },
    // {
    //   label: 'My Orders',

    //   linkTo: '/wishlist'
    // },
  ];

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('profile');
    navigate('/auth/login');

  };

  console.log("userr", user.role)


  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src="" alt="photoURL" />
      </IconButton>


      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ zIndex: 1000 }}

      >
        <Box sx={{ my: 1.5, px: 2.5, textAlign: 'center' }}>
          <Typography variant="subtitle1" noWrap>
            {user.role === 0 ? user.firstName + " " + user.lastName : user.pharmacyName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {/* {user.result.email} */}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {
          user.role == 0 ? (
            MENU_OPTIONS_BUYER.map((option) => (
              <div key={option.label} style={{ marginTop: '10px', marginBottom: '-20px' }}>
                <MenuItem
                  key={option.label}
                  to={option.linkTo}
                  component={RouterLink}
                  onClick={handleClose}
                  sx={{ typography: 'body2', width: '150px', }}
                >
                  <Box
                    component={Icon}
                    sx={{
                      mr: 2,
                      width: 40,
                      height: 24,
                    }}
                  />

                  {option.label}
                </MenuItem>
                <br></br>
              </div>
            ))
          ) : (
            MENU_OPTIONS_PHARMACY.map((option) => (
              <div key={option.label} style={{ marginTop: '10px', marginBottom: '-20px' }}>
                <MenuItem
                  key={option.label}
                  to={option.linkTo}
                  component={RouterLink}
                  onClick={handleClose}
                  sx={{ typography: 'body2', width: '150px', }}
                >
                  <Box
                    component={Icon}
                    sx={{
                      mr: 2,
                      width: 40,
                      height: 24,
                    }}
                  />

                  {option.label}
                </MenuItem>
                <br></br>
              </div>
            ))
          )
        }
        {/* {MENU_OPTIONS_PHARMACY.map((option) => (
          <div style={{ marginTop: '10px', marginBottom: '-20px' }}>
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
              sx={{ typography: 'body2', width: '150px', }}
            >
              <Box
                component={Icon}
                sx={{
                  mr: 2,
                  width: 40,
                  height: 24,
                }}
              />

              {option.label}
            </MenuItem>
            <br></br>
          </div>
        ))} */}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button onClick={logout} fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </Menu>
    </>
  );
}
