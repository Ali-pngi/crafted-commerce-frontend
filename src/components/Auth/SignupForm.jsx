// src/components/Auth/SignupForm.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';  
import './SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup, error, loading } = useAuth();  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [serverErrors, setServerErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setServerErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(formData);
      navigate('/');  
    } catch (error) {
      if (typeof error.message === 'object') {
        setServerErrors(error.message);
      } else {
        setServerErrors({ general: error.message });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        {error && <p className="auth-error">{error}</p>}
        {Object.keys(serverErrors).length > 0 && (
          <div className="auth-error">
            {Object.entries(serverErrors).map(([key, value]) => (
              <div key={key}>{key}: {value}</div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <div className="auth-buttons">
            <button type="submit" disabled={loading} className="auth-button">
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
            <Link to="/">
              <button type="button" className="auth-button cancel-button">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
