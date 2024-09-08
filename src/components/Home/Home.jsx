import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserProducts } from '../../services/userService'; 
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [watchlist, setWatchlist] = useState([]); 
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
          setWatchlist(data.map(item => item.product_id));
        } catch (error) {
          console.error('Error fetching watchlist:', error);
        }
      }
    };

    fetchProducts();
    fetchWatchlist();
  }, [user]);

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`);  // Allow all users to access product details
  };

  const handleWatchlistToggle = async (productId) => {
    if (!user) {
      navigate('/signin');  // Redirect unauthenticated users to sign in
      return;
    }

    try {
      const response = await fetch(`/api/watchlist/${productId}/`, {
        method: 'POST',
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

  const getImageUrl = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].image_url;  
    } else {
      return '/src/AppAssets/logo.png';  // Use default logo image if no image is available
    }
  };

  return (
    <Container>
      <h1>Products</h1>
      <Row className="gy-4">
        {products.map((product) => (
          <Col key={product.id} md={4}>
            <Card>
              <Card.Header>
                <Card.Title 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => handleProductClick(product)}
                >
                  {product.title || product.name}
                </Card.Title>
              </Card.Header>
              <Card.Img 
                variant="top" 
                src={getImageUrl(product)}  
                alt={product.title || product.name}
                style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => handleProductClick(product)}
              />
              <Card.Body>
                <Card.Text>Price: ${product.price}</Card.Text>
                {user && (
                  <Button 
                    variant={watchlist.includes(product.id) ? 'danger' : 'primary'} 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleWatchlistToggle(product.id);
                    }}
                    className="w-100"
                  >
                    {watchlist.includes(product.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
