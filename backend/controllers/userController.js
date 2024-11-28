const User = require('../models/user');

// Create
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = {
            name,
            email,
            password,
        }

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// Get

const getUser = async (req, res) => {
    try {
        const user = await (
            User.findById(req.params.id)
                .populate('userId', 'username'));
        if (!user) {
            res.status(404).json({message: 'No user with this id'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
// Update

const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updatedUser 
    }
}
// Delete