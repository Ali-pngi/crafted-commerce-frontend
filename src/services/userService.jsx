// src/services/userService.jsx

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL || 'http://127.0.0.1:8000';

if (!BACKEND_URL) {
  console.error('Backend URL is not defined!');
} else {
  console.log(`Backend URL is: ${BACKEND_URL}`);
}

const getUser = () => {
  const token = sessionStorage.getItem('token');
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

const getToken = () => sessionStorage.getItem('token');

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/signup/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    if (!json.access) {
      throw new Error('No token received');
    }

    sessionStorage.setItem('token', json.access);
    return getUser();
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

const signin = async (credentials) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/signin/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const { access, refresh } = await res.json();  
    if (!access || !refresh) {
      throw new Error('No tokens received');
    }

    sessionStorage.setItem('token', access);
    sessionStorage.setItem('refreshToken', refresh);

    return getUser();
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
};

const signout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('refreshToken');
};


const getUserProducts = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/products/`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};


const updateUserProfile = async (userId, userData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/${userId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};


const deleteUserAccount = async (userId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/${userId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete user account');
    }

    return true;
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};


export {
  getUser,
  getToken,
  signup,
  signin,
  signout,
  getUserProducts,
  updateUserProfile,  
  deleteUserAccount,   
};
