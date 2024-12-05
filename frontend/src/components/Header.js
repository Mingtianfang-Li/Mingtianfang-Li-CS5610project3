import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { removeToken, getToken } from '../utils/authUtils';

const Header = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (isLoggedIn) {
                const token = getToken();
                if (token) {
                    try {
                        const response = await apiClient.get('/api/users/me', {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        setUsername(response.data.username);
                    } catch (error) {
                        console.error('Error fetching user info:', error.response?.data?.message || error.message);
                        setUsername('Guest');
                    }
                }
            }
        };

        fetchUserData();
    }, [isLoggedIn]);

    const handleLogout = async () => {
        try {
            await apiClient.post('/api/auth/signout');
            removeToken();
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

    const menuItems = isLoggedIn
        ? [
            <MenuItem key="profile" onClick={() => { handleMenuClose(); navigate('/user-profile'); }}>
                {username || 'Loading...'}
            </MenuItem>,
            <MenuItem key="logout" onClick={() => { handleMenuClose(); handleLogout(); }}>
                Logout
            </MenuItem>,
        ]
        : [
            <MenuItem key="login" onClick={() => { handleMenuClose(); navigate('/login'); }}>
                Login
            </MenuItem>,
            <MenuItem key="signup" onClick={() => { handleMenuClose(); navigate('/signup'); }}>
                Sign Up
            </MenuItem>,
        ];

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
                        {menuItems}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
