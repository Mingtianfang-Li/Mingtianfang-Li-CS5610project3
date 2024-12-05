import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { handlePostEdit, handlePostDelete } from '../utils/postUtils';

const Post = ({ post, username, setPosts }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState(post.postContent);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewContent(post.postContent);
    };

    const handleSaveEdit = () => {
        handlePostEdit(post._id, newContent, setPosts);
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        handlePostDelete(post._id, setPosts);
    };

    return (
        <Box mb={2} p={2} border={1} borderRadius={2} boxShadow={3}>
            <Typography variant="h6">{username || 'Loading username...'}</Typography>
            {isEditing ? (
                <>
                    <TextField
                        fullWidth
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        label="Edit Post"
                        variant="outlined"
                        margin="normal"
                    />
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                            Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
                            Cancel
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="body1">{post.postContent}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        <strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        <strong>Updated At:</strong> {new Date(post.updatedAt).toLocaleString()}
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="outlined" color="primary" onClick={handleEditClick}>
                            Edit
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleDeleteClick}>
                            Delete
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Post;
