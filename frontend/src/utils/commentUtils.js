import apiClient from './apiClient';

// Edit Comment
export const handleCommentEdit = async (postId, commentId, newContent, setComments) => {
    try {
        const response = await apiClient.put(`/api/comments/${commentId}`, { commentContent: newContent });
        const updatedComment = response.data;

        setComments((prevComments) => ({
            ...prevComments,
            [postId]: prevComments[postId].map((comment) =>
                comment._id === updatedComment._id ? updatedComment : comment
            ),
        }));
    } catch (error) {
        console.error('Error updating comment:', error);
    }
};

// Delete Comment
export const handleCommentDelete = async (postId, commentId, setComments) => {
    try {
        await apiClient.delete(`/api/comments/${commentId}`);

        setComments((prevComments) => ({
            ...prevComments,
            [postId]: prevComments[postId].filter((comment) => comment._id !== commentId),
        }));
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
};
