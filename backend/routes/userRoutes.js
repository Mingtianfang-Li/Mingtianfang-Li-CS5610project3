const express = require('express');
const { authenticate } = require('../midware/auth');
const {
    createUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser); // Create a user
router.get('/:id', authenticate, getUser); // Get a user by ID
router.put('/:id', authenticate, updateUser); // Update user details
router.delete('/:id', authenticate, deleteUser); // Delete a user

module.exports = router;
