import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './NavBar.css';

const Navbar = ({ user }) => {
  const { signout } = useAuth(); 

  const handleSignout = () => {
    signout(); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menu
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                  <Link className="dropdown-item" to="/">Home</Link>
                </li>
                {user ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/profile">Profile</Link>
                    </li>
                    {user.role === 'admin' && (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/admin">Admin Panel</Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/create-product">Create Product</Link>
                        </li>
                      </>
                    )}
                    <li>
                      <button className="dropdown-item" onClick={handleSignout}>Sign Out</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/signin">Sign In</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/signup">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
