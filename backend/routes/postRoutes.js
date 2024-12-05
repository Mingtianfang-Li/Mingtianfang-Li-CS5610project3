const express = require('express');
const { authenticate } = require('../midware/auth');
const {
    createPost,
    getAllPostsByUserId,
    getPostById,
    updatePost,
    deletePost,
    getAllPost,
} = require('../controllers/postController');

const router = express.Router();
// Create a post
router.post('/', authenticate, createPost);
// Get all posts by a user
router.get('/user/:userId', authenticate, getAllPostsByUserId);
// Get a single post by postId
router.get('/:id', authenticate, getPostById);
// Update a post
router.put('/:id', authenticate, updatePost);
// Delete a post
router.delete('/:id', authenticate, deletePost);
// Get All Post
router.get('', getAllPost);

module.exports = router;
