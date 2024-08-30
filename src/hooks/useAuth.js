// hooks/useAuth.js
import { useState, useEffect } from 'react';
import {  getUser, signup, signin, signout } from '../services/authservice';  // Adjust path as needed

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = () => {
            const fetchedUser = getUser();
            setUser(fetchedUser);
            setLoading(false);
        };
        fetchUser();
    }, []);

    const handleSignup = async (formData) => {
        setLoading(true);
        try {
            await signup(formData);
            setUser(getUser());
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignin = async (userData) => {
        setLoading(true);
        try {
            await signin(userData);
            setUser(getUser());
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignout = () => {
        signout();
        setUser(null);
    };

    return {
        user,
        loading,
        error,
        signup: handleSignup,
        signin: handleSignin,
        signout: handleSignout
    };
};

export default useAuth;
