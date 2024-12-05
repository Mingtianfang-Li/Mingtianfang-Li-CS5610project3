const express = require('express');
const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

app.use(cors());

// Health Check Route (Test)
app.get('/api/status', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;
