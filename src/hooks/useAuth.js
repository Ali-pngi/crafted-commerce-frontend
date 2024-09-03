// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { getUser, signin, signup, signout } from '../services/userService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = getUser();  
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        signout();
      }
    }
    setLoading(false);
  }, []);

  const handleSignup = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const user = await signup(formData);
      setUser(user);
    } catch (error) {
      console.error('Signup failed:', error);
      setError(error.message || 'Failed to sign up');
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const user = await signin(credentials);  
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signup: handleSignup,
    signin: handleSignin,
    signout,
  };
};

export default useAuth;
