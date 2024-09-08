import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import './ProductDetails.css';
import useAuth from '../../hooks/useAuth';

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL || 'http://127.0.0.1:8000';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const checkIfInWatchlist = useCallback(async (productId) => {
    if (!user) return;
    try {
      const response = await fetch(`${BACKEND_URL}/api/watchlist/`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const watchlist = await response.json();
      const productInWatchlist = watchlist.some(item => item.product_id === productId);
      setIsInWatchlist(productInWatchlist);
    } catch (error) {
      console.error('Error checking watchlist:', error);
    }
  }, [user]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
        if (user) {
          checkIfInWatchlist(data.id);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id, user, checkIfInWatchlist]);

  const handleWatchlistToggle = async () => {
    if (!user || !product) return;

    try {
      let response;
      if (isInWatchlist) {
        response = await fetch(`${BACKEND_URL}/api/watchlist/${product.id}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
      } else {
        response = await fetch(`${BACKEND_URL}/api/watchlist/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({ product: product.id }),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to update watchlist');
      }

      
      setIsInWatchlist(!isInWatchlist);

      
      await checkIfInWatchlist(product.id);
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="product-details">
      <Row className="align-items-center">
        <Col md={6}>
          {product.images && product.images.length > 0 ? (
            <Carousel>
              {product.images.map((image) => (
                <Carousel.Item key={image.id}>
                  <div className="image-container">
                    <img
                      className="d-block w-100"
                      src={image.image_url}
                      alt={`Product ${product.title}`}
                    />
                  </div>
                  <Carousel.Caption>
                    <p>Uploaded on: {new Date(image.uploaded_at).toLocaleDateString()}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>No images available</p>
          )}
        </Col>
        <Col md={6}>
          <div className="product-info">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p className="price">Price: ${product.price}</p>
            <div className="button-group">
              {user && (
                <Button 
                  onClick={handleWatchlistToggle} 
                  variant={isInWatchlist ? 'danger' : 'primary'}
                  className="mr-2"
                >
                  {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </Button>
              )}
              {user && user.is_superuser && (
                <Button onClick={() => navigate(`/products/${product.id}/edit`)}>
                  Edit Product
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;