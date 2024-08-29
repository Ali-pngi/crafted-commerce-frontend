// api.js
import axios from 'axios';

export const fetchPosts = async () => {
  const response = await axios.get('/api/posts');
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post('/api/posts', postData);
  return response.data;
};

export const editPost = async (postId, updatedData) => {
  const response = await axios.put(`/api/posts/${postId}`, updatedData);
  return response.data;
};

export const deletePost = async (postId) => {
  await axios.delete(`/api/posts/${postId}`);
};
