import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from 'react';
import { LoggedinContext } from '../../../App';

export default function RightMenu() {
  const { loggedin, setLoggedin } = useContext(LoggedinContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return(
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        onClick={handleOpenUserMenu}
        sx={{ p: 0 }}
      >
        <PersonIcon
          sx={{ color: 'white' }}
        />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        disableScrollLock
      >
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            navigate('/edit_profile');
          }}
        >
          <Typography textAlign='center'>Edit Profile</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.removeItem('access');
            setLoggedin(localStorage.getItem('access'));
            handleCloseUserMenu();
            navigate('/login');
          }}
        >
          <Typography textAlign='center'>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};