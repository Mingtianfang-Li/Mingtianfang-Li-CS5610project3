const express = require('express');
const { authenticate } = require('../midware/auth');
const {
    createUser,
    getUser,
    updateUser,
    deleteUser, getMe
} = require('../controllers/userController');

const router = express.Router();

// Create a user
router.post('/', createUser);
// Get me
router.get('/me', authenticate, getMe);
// Get a user by ID
router.get('/:id', authenticate, getUser);
// Update user details
router.put('/:id', authenticate, updateUser);
// Delete a user
router.delete('/:id', authenticate, deleteUser);

module.exports = router;
