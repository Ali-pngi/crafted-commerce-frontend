// services/authService.js

const BACKEND_URL = 'http://127.0.0.1:8000';

const signup = async (username, password) => {
    const res = await fetch(`${BACKEND_URL}/api/auth/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
};

const signin = async (username, password) => {
    const res = await fetch(`${BACKEND_URL}/api/auth/signin/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
};

const signout = async (refreshToken) => {
    const res = await fetch(`${BACKEND_URL}/api/auth/signout/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
    });
    return res.json();
};

const checkSuperuser = async () => {
    const res = await fetch(`${BACKEND_URL}/api/auth/check-superuser/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return res.json();
};

export { signup, signin, signout, checkSuperuser };
