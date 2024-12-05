const User = require('../models/User');
const argon2 = require('argon2'); // Import Argon2 for password hashing

// Create a new user
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            username,
            email,
            password,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a user by ID
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'No user with this ID' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const updates = { username, email };

        if (password) {
            updates.password = await argon2.hash(password);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with this ID' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get me

const getMe = async (req, res) => {
    try {
        const userId = req.userId;
        // console.log("User ID from token:", userId);
        const user = await User.findById(userId).select('username');
        if (!user) {
            return res.status(404).json({ message: 'No user with this ID' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'No user with this ID' });
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getUser,
    getMe,
    updateUser,
    deleteUser,
};
