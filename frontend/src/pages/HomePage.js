import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import apiClient from '../utils/apiClient';
import Post from '../components/Post';
import Comment from '../components/Comment';  // Import Comment component

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});  // Store comments by postId

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch posts with populated user data
                const response = await apiClient.get('/api/posts');
                const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);

                // Fetch comments with populated user data
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

            } catch (error) {
                console.error('Error fetching posts or comments:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <Container>
                <Typography variant="h4" gutterBottom>
                    All Posts
                </Typography>
                <Box>
                    {posts.map((post) => (
                        <Box key={post._id} mb={4}>
                            <Post
                                post={post}
                                username={post.userId.username || 'Loading username...'} // Access populated username directly
                            />
                            <Box mt={2}>
                                <Typography variant="h6">Comments</Typography>
                                {comments[post._id]?.length > 0 ? (
                                    comments[post._id].map((comment) => (
                                        <Comment
                                            key={comment._id}
                                            comment={comment}
                                            username={comment.userId.username || 'Loading username...'} // Access populated username directly
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
        </div>
    );
};

export default HomePage;
