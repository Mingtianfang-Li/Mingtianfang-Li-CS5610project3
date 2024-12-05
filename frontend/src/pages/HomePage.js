import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, CircularProgress, Button, Modal, TextField } from '@mui/material';
import apiClient from '../utils/apiClient';
import Post from '../components/Post';
import Comment from '../components/Comment';
import { handlePostDelete, handlePostEdit } from "../utils/postUtils";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(true);
    const [openPostModal, setOpenPostModal] = useState(false);
    const [openCommentModal, setOpenCommentModal] = useState(null);
    const [newPostContent, setNewPostContent] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');
    const [currentPostId, setCurrentPostId] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get('/api/posts');
                const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);

                const postComments = {};
                for (const post of sortedPosts) {
                    try {
                        const commentsResponse = await apiClient.get(`/api/comments/${post._id}`);
                        postComments[post._id] = commentsResponse.data;
                    } catch (error) {
                        if (error.response?.status === 404) {
                            postComments[post._id] = [];
                        } else {
                            console.error(`Error fetching comments for post ${post._id}:`, error);
                        }
                    }
                }
                setComments(postComments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts or comments:', error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleNewPostClick = () => {
        setOpenPostModal(true);
    };

    const handleClosePostModal = () => {
        setOpenPostModal(false);
    };

    const handleCreatePost = async () => {
        try {
            const response = await apiClient.post('/api/posts', { postContent: newPostContent });
            setPosts([response.data, ...posts]);  // Add new post at the top
            setNewPostContent('');
            setOpenPostModal(false);
        } catch (error) {
            console.error('Error creating new post:', error);
        }
    };

    const handleNewCommentClick = (postId) => {
        setCurrentPostId(postId);
        setOpenCommentModal(postId);
    };

    const handleCloseCommentModal = () => {
        setOpenCommentModal(null);
        setCurrentPostId(null);
    };

    const handleCreateComment = async () => {
        try {
            const response = await apiClient.post('/api/comments', {
                postId: currentPostId,
                commentContent: newCommentContent,
            });

            const updatedComments = { ...comments };
            if (!updatedComments[currentPostId]) {
                updatedComments[currentPostId] = [];
            }
            updatedComments[currentPostId] = [response.data, ...updatedComments[currentPostId]];  // Add new comment at the top

            setComments(updatedComments);
            setNewCommentContent('');
            setOpenCommentModal(null);
        } catch (error) {
            console.error('Error creating new comment:', error);
        }
    };

    if (loading) {
        return (
            <Container>
                <Box mt={5} display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <div>
            <Container>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" gutterBottom>
                        All Posts
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleNewPostClick}>
                        New Post
                    </Button>
                </Box>
                <Box>
                    {posts.map((post) => (
                        <Box key={post._id} mb={4}>
                            <Post
                                post={post}
                                username={post.userId.username || 'Loading username...'}
                                setPosts={setPosts}
                                onEdit={handlePostEdit}
                                onDelete={handlePostDelete}
                            />
                            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">Comments</Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleNewCommentClick(post._id)}
                                >
                                    New Comment
                                </Button>
                            </Box>
                            <Box mt={2}>
                                {comments[post._id]?.length > 0 ? (
                                    comments[post._id].map((comment) => (
                                        <Comment
                                            key={comment._id}
                                            comment={comment}
                                            username={comment.userId.username || 'Loading username...'}
                                        />
                                    ))
                                ) : (
                                    <Typography variant="body2" color="textSecondary">No comments yet.</Typography>
                                )}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>
            <Modal
                open={openPostModal}
                onClose={handleClosePostModal}
                aria-labelledby="new-post-modal-title"
                aria-describedby="new-post-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                    }}
                >
                    <Typography variant="h6" id="new-post-modal-title" gutterBottom>
                        Create New Post
                    </Typography>
                    <TextField
                        fullWidth
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        label="Post Content"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button onClick={handleClosePostModal} variant="outlined" color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleCreatePost} variant="contained" color="primary">
                            Create Post
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={openCommentModal !== null}
                onClose={handleCloseCommentModal}
                aria-labelledby="new-comment-modal-title"
                aria-describedby="new-comment-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                    }}
                >
                    <Typography variant="h6" id="new-comment-modal-title" gutterBottom>
                        Create New Comment
                    </Typography>
                    <TextField
                        fullWidth
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                        label="Comment Content"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button onClick={handleCloseCommentModal} variant="outlined" color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleCreateComment} variant="contained" color="primary">
                            Create Comment
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default HomePage;
