import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { handleCommentEdit, handleCommentDelete } from '../utils/commentUtils';

const Comment = ({ comment, username, setComments, postId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState(comment.commentContent);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewContent(comment.commentContent);
    };

    const handleSaveEdit = () => {
        handleCommentEdit(postId, comment._id, newContent, setComments);
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        handleCommentDelete(postId, comment._id, setComments);
    };

    return (
        <Box mb={1} p={1} border={1} borderRadius={2} boxShadow={2} bgcolor="#f5f5f5">
            {isEditing ? (
                <>
                    <TextField
                        fullWidth
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        label="Edit Comment"
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
                    <Typography variant="body1">{comment.commentContent}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        <strong>By:</strong> {username || 'Unknown user'}
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button size="small" variant="outlined" color="primary" onClick={handleEditClick}>
                            Edit
                        </Button>
                        <Button size="small" variant="outlined" color="secondary" onClick={handleDeleteClick}>
                            Delete
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Comment;
