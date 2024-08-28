import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import * as authService from '../../services/authService'
import './SignupForm.scss' 

const SignupForm = ({ setUser }) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    hashedPassword: '',
    passwordConf: '',
  })

  const updateMessage = (message) => {
    setMessage(message)
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newUser = await authService.signup(formData)
      setUser(newUser.user)
      navigate('/')
    } catch (error) {
      updateMessage(error.message)
    }
  }

  const { email, username, hashedPassword, passwordConf } = formData

  const isFormInvalid = () => {
    return !(email && username && hashedPassword && hashedPassword === passwordConf)
  }

  return (
    <Container className="signup-form">
      <h1>Sign Up</h1>
      {message && <Alert variant="danger">{message}</Alert>}
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
        <div className="btn-container">
          <Button variant="primary" type="submit" disabled={isFormInvalid()}>
            Sign Up
          </Button>
          <Link to="/">
            <Button variant="secondary">Go Back</Button>
          </Link>
        </div>
      </Form>
    </Container>
  )
}

export default SignupForm
