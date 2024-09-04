import React from 'react';
import logo from '../../AppAssets/logo.png';
import './logo.css'


const Logo = () => {
  return (
    <div className="logo-container text-center my-3">
      <img src={logo} alt="Crafted Commerce Logo" className="logo-img" style={{ width: '150px', height: 'auto' }} />
    </div>
  );
};

export default Logo;
