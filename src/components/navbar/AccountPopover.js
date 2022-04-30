import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';
// material
import { alpha } from '@material-ui/core/styles';
import { Button, Box, Divider,  Typography, Avatar, IconButton } from '@material-ui/core';
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

  const MENU_OPTIONS = [
    {
      label: 'Profile',

      linkTo: '/profile'
    },
    {
      label: 'My Orders',

      linkTo: '/wishlist'
    },
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
        
      >
        <Box sx={{ my: 1.5, px: 2.5, textAlign: 'center' }}>
          <Typography variant="subtitle1" noWrap>
            {/* {user.result.firstName} {user.result.lastName} */}
            {user.firstName} {user.lastName} || {user.pharmacyName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {/* {user.result.email} */}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <div style={{ marginTop: '10px'}}>
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', width: '150px'}}
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
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button onClick={logout} fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </Menu>
    </>
  );
}
