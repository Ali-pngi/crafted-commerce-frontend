// src/components/Home/Home.jsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserProducts } from '../../services/userService'; 
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [watchlist, setWatchlist] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getUserProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchWatchlist = async () => {
      if (user) {
        try {
          const response = await fetch('/api/watchlist/', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setWatchlist(data.map(item => item.product_id)); // Note change here to match serialized response
        } catch (error) {
          console.error('Error fetching watchlist:', error);
        }
      }
    };

    fetchProducts();
    fetchWatchlist();
  }, [user]);

  const handleProductClick = (product) => {
    if (!user) {
      setShowModal(true);
    } else {
      navigate(`/products/${product.id}`); 
    }
  };

  const handleWatchlistToggle = async (productId) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/watchlist/${productId}/`, {
        method: 'POST',  // Only use POST method now
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error updating watchlist');
      }

      const result = await response.json();
      if (result.message === 'Added to watchlist') {
        setWatchlist([...watchlist, productId]);
      } else {
        setWatchlist(watchlist.filter(id => id !== productId));
      }
      
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
      <h1>Products</h1>
      <Row className="gy-4">
        {products.map((product) => (
          <Col key={product.id} md={4}>
            <Card onClick={() => handleProductClick(product)}>
              <Card.Img 
                variant="top" 
                src={product.image ? product.image : '/path/to/default-image.png'} 
                alt={product.name}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                {user && (
                  <Button 
                    variant={watchlist.includes(product.id) ? 'danger' : 'primary'} 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleWatchlistToggle(product.id);
                    }}
                  >
                    {watchlist.includes(product.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please log in or sign up to interact with products.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" href="/signin">
            Sign In
          </Button>
          <Button variant="success" href="/signup">
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
