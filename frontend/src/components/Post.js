import React from 'react';
import { Box, Typography } from '@mui/material';

const Post = ({ post, username }) => {
    return (
        <Box mb={2} p={2} border={1} borderRadius={2} boxShadow={3}>
            <Typography variant="h6">{username || 'Loading username...'}</Typography>
            <Typography variant="body1">{post.postContent}</Typography>
            <Typography variant="body2" color="textSecondary">
                <strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                <strong>Updated At:</strong> {new Date(post.updatedAt).toLocaleString()}
            </Typography>
        </Box>
    );
};

export default Post;