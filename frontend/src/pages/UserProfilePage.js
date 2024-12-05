import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Button, TextField } from '@mui/material';
import { getToken } from '../utils/authUtils';
import apiClient from '../utils/apiClient';
import Post from '../components/Post';
import {handlePostDelete, handlePostEdit} from "../utils/postUtils";

const UserProfilePage = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [posts, setPosts] = useState([]);  // State to hold user's posts

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const getMeResponse = await apiClient.get('/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });

                const { username, _id: userId } = getMeResponse.data;
                const userInfoResponse = await apiClient.get(`/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });

                const { email } = userInfoResponse.data;

                const postsResponse = await apiClient.get(`/api/posts/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });

                setUser({
                    username,
                    email,
                });

                setPosts(postsResponse.data);
                setNewUsername(username);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = async () => {
        try {
            const getMeResponse = await apiClient.get('/api/users/me', {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            const { _id: userId } = getMeResponse.data;
            await apiClient.put(`/api/users/${userId}`, {
                username: newUsername,
                currentPassword,
                newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            setUser((prevState) => ({ ...prevState, username: newUsername }));
            setIsEditing(false);
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            console.error('Error saving changes:', error.message);
        }
    };


    if (loading) {
        return (
            <Container>
                <Box mt={5} display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container>
            <Box mt={5} p={3} borderRadius={1} boxShadow={3} bgcolor="#f9f9f9">
                <Typography variant="h4" gutterBottom align="center">
                    User Profile
                </Typography>
                <Box mt={2}>
                    <Typography variant="h6" gutterBottom>
                        Username:
                    </Typography>
                    {isEditing ? (
                        <TextField
                            fullWidth
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            label="New Username"
                            variant="outlined"
                            margin="normal"
                        />
                    ) : (
                        <Typography variant="body1">{user.username || 'N/A'}</Typography>
                    )}
                </Box>
                <Box mt={2}>
                    <Typography variant="h6" gutterBottom>
                        Email:
                    </Typography>
                    <Typography variant="body1">{user.email || 'N/A'}</Typography>
                </Box>
                <Box mt={2}>
                    <Typography variant="h6" gutterBottom>
                        Password:
                    </Typography>
                    {isEditing ? (
                        <>
                            <TextField
                                fullWidth
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                label="Current Password"
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                label="New Password"
                                variant="outlined"
                                margin="normal"
                            />
                        </>
                    ) : (
                        <Typography variant="body1">********</Typography>
                    )}
                </Box>
                <Box mt={2} display="flex" justifyContent="center">
                    {isEditing ? (
                        <>
                            <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleEditClick}>
                            Edit Profile
                        </Button>
                    )}
                </Box>

                <Box mt={5}>
                    <Typography variant="h5" gutterBottom>
                        Your Posts
                    </Typography>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Post
                                key={post._id}
                                post={post}
                                username={user.username}
                                setPosts={setPosts}
                                onEdit={handlePostEdit}
                                onDelete={handlePostDelete}
                            />
                        ))
                    ) : (
                        <Typography variant="body1">No posts found.</Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default UserProfilePage;
