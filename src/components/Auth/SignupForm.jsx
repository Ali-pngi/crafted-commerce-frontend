import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';  // Use your custom hook
import './SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup, error, loading } = useAuth();  // Get signup function, error, and loading state
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    hashedPassword: '',
    passwordConf: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(formData);  // Use signup from useAuth
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const { email, username, hashedPassword, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(email && username && hashedPassword && hashedPassword === passwordConf);
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center signup-form">
      <div>
        <h1>Sign Up</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="hashedPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="hashedPassword"
              value={hashedPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="passwordConf">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="passwordConf"
              value={passwordConf}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" type="submit" disabled={loading || isFormInvalid()}>
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
