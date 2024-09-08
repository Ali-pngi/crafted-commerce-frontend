const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL || 'http://127.0.0.1:8000/api';

if (!BACKEND_URL) {
  console.error('Backend URL is not defined!');
} else {
  console.log(`Backend URL is: ${BACKEND_URL}`);
}

const getUser = () => {
  const userData = sessionStorage.getItem('userData');
  if (!userData) return null;

  try {
    const parsedUser = JSON.parse(userData);
    if (!parsedUser.id) {
      console.error('User data is missing ID');
      return null;
    }
    return parsedUser;
  } catch (error) {
    console.error('Error parsing user data:', error);
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

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }

    sessionStorage.setItem('token', data.access);
    sessionStorage.setItem('refreshToken', data.refresh);

    const userData = {
      id: data.user_id,
      username: data.username,
      email: data.email,
      date_joined: data.date_joined
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));

    return userData;
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

    const data = await res.json();
    if (!data.access || !data.refresh) {
      throw new Error('No tokens received');
    }

    sessionStorage.setItem('token', data.access);
    sessionStorage.setItem('refreshToken', data.refresh);

    // Store user data in sessionStorage
    const userData = {
      id: data.user_id,
      username: data.username,
      email: data.email,
      is_superuser: data.is_superuser,
      date_joined: data.date_joined
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
};

const signout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('userData');
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