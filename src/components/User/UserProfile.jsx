// src/components/User/UserProfile.jsx

import React, { useState, useEffect } from 'react';
import { getUser, updateUserProfile, deleteUserAccount, signout } from '../../services/userService'; // Ensure path is correct

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setUser(userData);
      setProfileData({ username: userData.username, email: userData.email });
    }
  }, []);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const updatedUser = await updateUserProfile(user.id, profileData);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await deleteUserAccount(user.id);
      signout();
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <input
            type="text"
            value={profileData.username}
            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
          />
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          />
          <button onClick={handleUpdateProfile} disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
          <button onClick={handleDeleteAccount} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
