const mongoose = require('mongoose');
const User = require('./User');
const Post = require('./Post');

const commentSchema = new mongoose.Schema({
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

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        validate: {
            validator: async function(postId) {
                const post = await Post.findById(postId);
                return !!post;
            },
            message: 'Invalid postId'
        }
    },

    commentContent: {
        type: String,
        required: true,
    },
}, { timestamps: true });

commentSchema.post('save', function(error, doc, next) {
    if (error.name === 'ValidationError') {
        next(new Error('Validation failed: ' + Object.values(error.errors).map(err => err.message).join(', ')));
    } else {
        next(error);
    }
});

commentSchema.pre('find', function(next) {
    this.populate('userId', 'username');
    next();
});

commentSchema.pre('findOne', function(next) {
    this.populate('userId', 'username');
    next();
});

module.exports = mongoose.model('Comment', commentSchema);
