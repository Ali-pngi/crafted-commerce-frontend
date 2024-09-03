

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Crafted Commerce!</h1>
            <p>Your one-stop shop for handmade goods and crafts.</p>
            
            <div style={{ marginTop: '30px' }}>
                <Link to="/signin" style={{ marginRight: '20px', textDecoration: 'none', padding: '10px 20px', border: '1px solid #000', borderRadius: '5px' }}>
                    Sign In
                </Link>
                <Link to="/signup" style={{ textDecoration: 'none', padding: '10px 20px', border: '1px solid #000', borderRadius: '5px' }}>
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Home;
