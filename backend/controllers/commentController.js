const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

// Create
const createComment = async (req, res) => {
    try {
        const userId = req.userId;
        const { postId, commentContent } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!commentContent) {
            return res.status(400).json({ message: 'Comment content is required' });
        }

        const newComment = new Comment({
            userId,
            postId,
            commentContent
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all comments for a postId
const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId })
            .populate('userId', 'username')
            .populate('postId', 'postContent');

        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this post' });
        }

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single comment by commentId
const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('userId', 'username')
            .populate('postId', 'postContent');

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
const updateComment = async (req, res) => {
    try {
        const { commentContent } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { commentContent },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
const deleteComment = async (req, res) => {
    try {
        const userId = req.user.id;

        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }

        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createComment,
    getCommentsByPostId,
    getCommentById,
    updateComment,
    deleteComment
};
