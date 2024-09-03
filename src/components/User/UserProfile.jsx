// src/components/UserProfile.jsx

import React, { useState, useEffect } from 'react';
import { getUser, updateUserProfile, deleteUserAccount, signout } from '../../services/userService';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = getUser();
      if (currentUser) {
        setUser(currentUser);
        setFormData({ username: currentUser.username, email: currentUser.email });
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const updatedUser = await updateUserProfile(user.id, formData);
      setUser(updatedUser);
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      await deleteUserAccount(user.id);
      alert('Account deleted successfully!');
      signout();
      window.location.href = '/'; // Redirect to home or another appropriate route after deletion
    } catch (err) {
      setError('Failed to delete account.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleProfileUpdate}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      <button onClick={handleAccountDeletion} className="delete-button" disabled={loading}>
        {loading ? 'Processing...' : 'Delete Account'}
      </button>
    </div>
  );
};

export default UserProfile;
