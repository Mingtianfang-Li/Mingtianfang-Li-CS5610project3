const express = require('express');
const { authenticate } = require('../midware/auth');
const {
    createComment,
    getCommentsByPostId,
    deleteComment
} = require('../controllers/commentController');
const {getAllPostsByUserId} = require("../controllers/postController");

const router = express.Router();

// Create a comment
router.post('/', authenticate, createComment);
// Get all comments for a postId
router.get('/:postId', getCommentsByPostId);
// Delete a comment by ID
router.delete('/:id', authenticate, deleteComment);

module.exports = router;
