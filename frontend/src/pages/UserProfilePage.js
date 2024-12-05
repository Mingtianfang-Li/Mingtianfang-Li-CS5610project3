import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
// import Header from '../components/Header';

const UserProfilePage = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await fetch('/api/users/me');
            const data = await response.json();
            setUser(data);
        };

        fetchUserProfile();
    }, []);

    return (
        <div>
            {/*<Header isLoggedIn={true} username={user.username} onLogout={() => {}} />*/}
            <Container>
                <Box mt={5}>
                    <Typography variant="h4" gutterBottom>
                        User Profile
                    </Typography>
                    <Typography variant="h6">Username: {user.username}</Typography>
                    <Typography variant="body1">Email: {user.email}</Typography>
                    {/* Add more user details as needed */}
                </Box>
            </Container>
        </div>
    );
};

export default UserProfilePage;
