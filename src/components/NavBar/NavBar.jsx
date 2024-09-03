import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const CustomNavbar = () => {
  const { user, signout } = useAuth();

  console.log('Logged-in User:', user);  // Add this line to log user details for debugging

  return (
    <Navbar bg="light" expand="lg" className="w-15">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end"> 
          <Nav>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/">Home</NavDropdown.Item>
              <NavDropdown.Divider />
              
              {!user ? (
                <>
                  <NavDropdown.Item as={Link} to="/signin">Sign in</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/signup">Sign up</NavDropdown.Item>
                </>
              ) : (
                <>
                  {user.is_superuser && (
                    <>
                      <NavDropdown.Item as={Link} to="/create-product">Create Product</NavDropdown.Item>
                      <NavDropdown.Divider />
                    </>
                  )}
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signout}>Logout</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
