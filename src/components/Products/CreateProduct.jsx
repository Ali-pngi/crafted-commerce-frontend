import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const CreateProduct = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && !user.is_superuser) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET}/image/upload`,
        formData
      );
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image to Cloudinary', error);
      setError('Failed to upload image. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products/', 
        { 
          title: name,  
          description, 
          price: parseFloat(price),  
          image: imageUrl 
        },
        {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Product created:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating product', error.response ? error.response.data : error);
      setError('Failed to create product. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Alert variant="warning">Please sign in to access this page.</Alert>;
  }

  if (!user.is_superuser) {
    return (
      <Modal show={true} onHide={() => navigate('/')}>
        <Modal.Header closeButton>
          <Modal.Title>Unauthorized Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are not authorized to create products.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="container">
      <h1>Create a New Product</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </Form.Group>
        {imageUrl && (
          <div className="mb-3">
            <img src={imageUrl} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
          </div>
        )}
        <Button type="submit" variant="primary">Create Product</Button>
      </Form>
    </div>
  );
};

export default CreateProduct;