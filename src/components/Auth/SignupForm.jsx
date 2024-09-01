import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';  
import './SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup, error, loading } = useAuth();  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [serverErrors, setServerErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setServerErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(formData);
      navigate('/');  
    } catch (error) {
      if (typeof error.message === 'object') {
        setServerErrors(error.message);
      } else {
        setServerErrors({ general: error.message });
      }
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center signup-form">
      <div className='form card'>
        <h1>Sign Up</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {Object.keys(serverErrors).length > 0 && (
          <Alert variant="danger">
            {Object.entries(serverErrors).map(([key, value]) => (
              <div key={key}>{key}: {value}</div>
            ))}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!serverErrors.username}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!serverErrors.email}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!serverErrors.password}
              required
            />
          </Form.Group>
          <Form.Group controlId="password_confirmation">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              isInvalid={formData.password !== formData.password_confirmation}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
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

export default SignupForm;
