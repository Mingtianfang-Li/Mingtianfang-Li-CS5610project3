const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    commentContent: {
        type: String,
        required: true
    },
    timestamps: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Comments', commentSchema);
