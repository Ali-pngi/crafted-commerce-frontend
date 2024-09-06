import { useState, useEffect, useCallback } from 'react';
import { getUser, signin, signup, signout } from '../services/userService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const userData = getUser();
          console.log('User data:', userData);
          if (userData && userData.id) {
            setUser(userData);
            setIsAdmin(userData.is_superuser);
            console.log('Is admin:', userData.is_superuser);
          } else {
            console.error('User data is invalid or missing ID');
            handleSignout();
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          handleSignout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const handleSignin = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await signin(credentials);
      if (userData && userData.id) {
        setUser(userData);
        setIsAdmin(userData.is_superuser);
      } else {
        throw new Error('Invalid user data received');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSignup = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await signup(formData);
      if (userData && userData.id) {
        setUser(userData);
        setIsAdmin(userData.is_superuser);
      } else {
        throw new Error('Invalid user data received');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setError(error.message || 'Failed to sign up');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSignout = useCallback(() => {
    signout();
    setUser(null);
    setIsAdmin(false);
  }, []);

  return {
    user,
    isAdmin,
    loading,
    error,
    signin: handleSignin,
    signup: handleSignup,
    signout: handleSignout,
  };
};

export default useAuth;