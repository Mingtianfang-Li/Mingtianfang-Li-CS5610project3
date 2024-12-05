import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../utils/authUtils';
import apiClient from '../utils/apiClient';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await apiClient.post('/api/auth/signin', { email, password });

            // Save the token and trigger login callback
            saveToken(data.token);
            onLogin();

            // Navigate to the homepage
            navigate('/');
        } catch (error) {
            console.error('Error during login:', error);
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <div>
            <Container>
                <Box mt={5}>
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default LoginPage;
