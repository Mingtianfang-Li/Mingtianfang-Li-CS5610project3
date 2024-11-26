const mongoose = require('mongoose');
const User = require("./User");

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function(userId) {
                const user = await User.findById(userId);
                return !!user;
            },
            message: 'Invalid userId'
        }
    },

    postContent: {
        type: String,
        required: true,
    },
}, {timestamps: true});

postSchema.post('save', function(error, doc, next) {
    if (error.name === 'ValidationError') {
        next(new Error('Validation failed: ' + Object.values(error.errors).map(err => err.message).join(', ')));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('Post', postSchema);