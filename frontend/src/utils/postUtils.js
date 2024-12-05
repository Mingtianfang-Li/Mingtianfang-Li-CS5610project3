import apiClient from './apiClient';
import { getToken } from './authUtils';

export const handlePostDelete = async (postId, setPosts) => {
    try {
        const response = await apiClient.delete(`/api/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });

        console.log('Post deleted:', response.data);
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (error) {
        console.error('Error deleting post:', error.response ? error.response.data : error.message);
    }
};

export const handlePostEdit = async (postId, newContent, setPosts) => {
    try {
        const response = await apiClient.put(`/api/posts/${postId}`, { postContent: newContent }, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });

        console.log('Post updated:', response.data);
        setPosts(prevPosts => prevPosts.map(post => post._id === postId ? { ...post, postContent: newContent } : post));
    } catch (error) {
        console.error('Error editing post:', error.response ? error.response.data : error.message);
    }
};
