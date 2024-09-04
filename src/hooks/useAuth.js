// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { getUser, signin, signup, signout } from '../services/userService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const userData = getUser();
        setUser(userData);
        setIsAdmin(userData && userData.is_superuser);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        signout();
      }
    }
    setLoading(false);
  }, []);

  const handleSignin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const user = await signin(credentials);
      setUser(user);
      setIsAdmin(user && user.is_superuser);
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
    isAdmin,
    loading,
    error,
    signin: handleSignin,
    signout,
  };
};

export default useAuth;
