const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

if (!BACKEND_URL) {
    console.error('Backend URL is not defined!');
} else {
    console.log(`Backend URL is: ${BACKEND_URL}`);
}

const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const user = JSON.parse(atob(token.split('.')[1]));
        return user;
    } catch (error) {
        console.error('Error parsing token:', error);
        return null;
    }
};

const getToken = () => {
    return localStorage.getItem('token');
};

const signup = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        if (json.error) {
            throw new Error(json.error);
        }

        localStorage.setItem('token', json.token);
        return json;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

const signin = async (user) => {
    try {
        const res = await fetch(`${BACKEND_URL}/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        if (!json.token) {
            throw new Error('No token received');
        }

        localStorage.setItem('token', json.token);
        return JSON.parse(atob(json.token.split('.')[1]));
    } catch (error) {
        console.error('Signin error:', error);
        throw error;
    }
};

const signout = () => {
    localStorage.removeItem('token');
};

export { getToken, getUser, signup, signin, signout };
