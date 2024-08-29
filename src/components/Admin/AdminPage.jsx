import React, { useState } from 'react';
import usePosts from '../../hooks/usePosts'; 
import PostForm from './PostForm'; 

function AdminPage() {
  const { posts, loading, error, handleCreate, handleEdit, handleDelete } = usePosts();
  const [currentPost, setCurrentPost] = useState({ title: '', content: '' });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Panel</h1>
      <PostForm
        post={currentPost}
        onChange={setCurrentPost}
        onSubmit={() => {
          if (currentPost.id) {
            handleEdit(currentPost.id, currentPost);
          } else {
            handleCreate(currentPost);
          }
          setCurrentPost({ title: '', content: '' });
        }}
      />

      <h2>Manage Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => setCurrentPost(post)}>Edit</button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
