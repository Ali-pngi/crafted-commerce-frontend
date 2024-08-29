const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
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
        const json = await res.json();
        if (json.error) {
            throw new Error(json.error);
        }
        localStorage.setItem('token', json.token);
        return json;
    } catch (error) {
        throw new Error(error);
    }
};

const signin = async (user) => {
    try {
        const res = await fetch(`${BACKEND_URL}/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        const json = await res.json();
        if (json.error) {
            throw new Error(json.error);
        }
        if (json.token) {
            localStorage.setItem('token', json.token);
            return JSON.parse(atob(json.token.split('.')[1]));
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const signout = () => {
    localStorage.removeItem('token');
};

export { getToken, getUser, signup, signin, signout };