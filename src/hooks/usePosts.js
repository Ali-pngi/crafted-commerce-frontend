import { useState, useEffect } from 'react';
import { fetchPosts, createPost, editPost, deletePost } from '../../api'; 
function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleCreate = async (newPost) => {
    try {
      const createdPost = await createPost(newPost);
      setPosts((prevPosts) => [...prevPosts, createdPost]);
    } catch (error) {
      setError('Failed to create post');
    }
  };

  const handleEdit = async (postId, updatedPost) => {
    try {
      const editedPost = await editPost(postId, updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? editedPost : post))
      );
    } catch (error) {
      setError('Failed to edit post');
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      setError('Failed to delete post');
    }
  };

  return {
    posts,
    loading,
    error,
    handleCreate,
    handleEdit,
    handleDelete,
  };
}

export default usePosts;
