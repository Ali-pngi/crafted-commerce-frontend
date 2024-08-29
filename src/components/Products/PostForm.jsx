import React from 'react';

function PostForm({ post, onChange, onSubmit }) {
  return (
    <div>
      <h2>{post.id ? 'Edit Post' : 'Create New Post'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={post.title}
        onChange={(e) => onChange({ ...post, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={post.content}
        onChange={(e) => onChange({ ...post, content: e.target.value })}
      />
      <button onClick={onSubmit}>{post.id ? 'Update Post' : 'Create Post'}</button>
    </div>
  );
}

export default PostForm;
