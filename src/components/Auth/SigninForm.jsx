import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import './SigninForm.css';

const SigninForm = () => {
  const navigate = useNavigate();
  const { signin, error, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [usernameExists, setUsernameExists] = useState(true);
  const [checkingUsername, setCheckingUsername] = useState(false);

  useEffect(() => {
    const checkUsername = async (username) => {
      if (!username) return;
      setCheckingUsername(true);
      try {
        const response = await fetch(`/api/auth/check-username/?username=${username}`);
        const result = await response.json();
        setUsernameExists(!result.available); // If not available, it means username exists
      } catch (error) {
        console.error('Error checking username:', error);
      } finally {
        setCheckingUsername(false);
      }
    };

    checkUsername(formData.username);
  }, [formData.username]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!usernameExists) return; // Do not submit if the username does not exist
    try {
      await signin(formData);
      navigate('/');
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center signin-form">
      <div className="form card">
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
              isInvalid={!usernameExists}
              required
            />
            {!usernameExists && <Form.Text className="text-danger">Username does not exist</Form.Text>}
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" type="submit" disabled={loading || !usernameExists}>
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
            <Link to="/">
              <Button variant="secondary">Go Back</Button>
            </Link>
          </div>
          {checkingUsername && <Spinner animation="border" size="sm" className="ml-2" />}
        </Form>
      </div>
    </Container>
  );
};

export default SigninForm;
