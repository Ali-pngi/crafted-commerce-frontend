const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

if (!BACKEND_URL) {
    console.error('Backend URL is not defined!');
} else {
    console.log(`Backend URL is: ${BACKEND_URL}`);
}

const getUserProducts = async (userId) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/products?user=${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user products');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user products:', error);
        return [];
    }
};

const getUserWatchlist = async (userId) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/watchlist/?user=${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user watchlist');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user watchlist:', error);
        return [];
    }
};

const updateUserProfile = async (userId, userData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/users/${userId}/`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to update user profile');
        }

        const data = await response.json();
        return data;
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
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
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

export { getUserProducts, getUserWatchlist, updateUserProfile, deleteUserAccount };
