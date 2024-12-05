const Post = require('../models/Post');

// Create a new post
const createPost = async (req, res) => {
    const { postContent } = req.body;
    const userId = req.userId;

    if (!postContent) {
        return res.status(400).json({ message: 'Post content is required' });
    }

    try {
        const newPost = new Post({
            userId,
            postContent,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all posts by userId
const getAllPostsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId }).populate('userId', 'username');
        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Post
const getAllPost  = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
}

// Get a single post by postId
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('userId', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
const updatePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!post.userId.equals(req.userId)) {
            return res.status(403).json({ message: 'You are not authorized to edit this post' });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { postContent: req.body.postContent },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // console.log('This is UserID from Post: ', post.userId.toString());
        // console.log('is equal ?', !post.userId.equals(req.userId));
        if (!post.userId.equals(req.userId)) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    getAllPostsByUserId,
    getAllPost,
    getPostById,
    updatePost,
    deletePost
};
