import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ isLoggedIn, username, onLogout }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/signout', null, { withCredentials: true });
            onLogout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error.response?.data?.message || error.message);
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    WePosts
                </Typography>
                <Box>
                    <IconButton
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => { handleMenuClose(); navigate('/'); }}>Home</MenuItem>
                        {isLoggedIn ? (
                            <>
                                <MenuItem onClick={() => { handleMenuClose(); navigate('/user-profile'); }}>
                                    {username}
                                </MenuItem>
                                <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>Logout</MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={() => { handleMenuClose(); navigate('/login'); }}>Login</MenuItem>
                                <MenuItem onClick={() => { handleMenuClose(); navigate('/signup'); }}>Sign Up</MenuItem>
                            </>
                        )}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
