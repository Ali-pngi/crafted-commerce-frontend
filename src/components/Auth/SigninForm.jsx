import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import  useAuth  from '../../hooks/useAuth';  
import './SigninForm.css';

const SigninForm = () => {
  const navigate = useNavigate();
  const { signin, error, loading } = useAuth();  
  const [formData, setFormData] = useState({
    username: '',
    hashedPassword: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const userData = await signin(formData);  // signin handles setUser internally
        if (userData === 'admin') {
            navigate('/admin');  
        } else {
            navigate('/');  
        }
    } catch (error) {
        console.error('Sign-in error:', error);
    }
};

  

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center signin-form">
      <div className ='form card'>
        <h1>Log In</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="hashedPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="hashedPassword"
              value={formData.hashedPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
            <Link to="/">
              <Button variant="secondary">Go Back</Button>
            </Link>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default SigninForm;
