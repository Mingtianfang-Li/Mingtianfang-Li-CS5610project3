const express = require('express');
const { authenticate } = require('../midware/auth');
const {
    createComment,
    getCommentsByPostId,
    deleteComment, updateComment
} = require('../controllers/commentController');
const {getAllPostsByUserId} = require("../controllers/postController");

const router = express.Router();

// Create a comment
router.post('/', authenticate, createComment);
// Get all comments for a postId
router.get('/:postId', getCommentsByPostId);
// Update a comment
router.put('/:postId', authenticate, updateComment);
// Delete a comment by ID
router.delete('/:id', authenticate, deleteComment);

module.exports = router;
