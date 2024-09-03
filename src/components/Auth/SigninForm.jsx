// components/Auth/SigninForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useAuth from '../../hooks/useAuth'; 

const SigninForm = () => {
  const { signin, loading, error } = useAuth();
  const navigate = useNavigate(); 
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(credentials); 
      navigate('/');
    } catch (error) {
      console.error('Error during signin:', error);
    }
  };
  

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SigninForm;
