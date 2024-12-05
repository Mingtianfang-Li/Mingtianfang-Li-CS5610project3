import React from 'react';
import { Box, Typography } from '@mui/material';

const Comment = ({ comment, username }) => {
    return (
        <Box mb={1} p={1} border={1} borderRadius={2} boxShadow={2} bgcolor="#f5f5f5">
            <Typography variant="body1">{comment.commentContent}</Typography>
            <Typography variant="body2" color="textSecondary">
                <strong>By:</strong> {username || 'Unknown user'}
            </Typography>
        </Box>
    );
};

export default Comment;
