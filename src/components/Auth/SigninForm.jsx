// src/components/Auth/SigninForm.jsx

import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import './SigninForm.css';

const SigninForm = () => {
  const { signin, loading, error } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(credentials);
      navigate('/');
    } catch (error) {
      console.error('Error during signin:', error);
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Card className="p-4 shadow-sm" style={{ width: '400px', borderRadius: '20px', backgroundColor: '#D6B58E' }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="rounded-pill"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="rounded-pill"
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex justify-content-between mt-3">
            <Button type="submit" variant="primary" disabled={loading} className="w-100 rounded-pill">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </Form>
        <div className="mt-3 text-center">
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </div>
      </Card>
    </Container>
  );
};

export default SigninForm;
