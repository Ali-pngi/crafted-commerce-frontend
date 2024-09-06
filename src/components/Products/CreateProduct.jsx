import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const CreateProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user || !user.is_superuser) {
      setShowModal(true);
    }
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image to Cloudinary', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products/', { 
        name, 
        description, 
        price, 
        image: imageUrl 
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Create a New Product</h1>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Unauthorized Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are not authorized to create products.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Return to Home
          </Button>
        </Modal.Footer>
      </Modal>

      {user && user.is_superuser && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Product Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>
          {imageUrl && (
            <div className="mb-3">
              <label>Preview:</label>
              <img src={imageUrl} alt="Preview" style={{ width: '100%', height: 'auto' }} />
            </div>
          )}
          <button type="submit" className="btn btn-primary">Create Product</button>
        </form>
      )}
    </div>
  );
};

export default CreateProduct;