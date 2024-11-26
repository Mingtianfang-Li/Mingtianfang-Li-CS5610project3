const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    postContent: {
        type: String,
        required: true,
    },

    timestamps: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Post', postSchema);