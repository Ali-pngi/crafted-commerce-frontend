// src/components/Products/ProductDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, Button } from 'react-bootstrap';
import './ProductDetails.css';

const ProductDetails = ({ user }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
        checkIfInWatchlist(data.id);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const checkIfInWatchlist = async (productId) => {
    if (!user) return;
    try {
      const response = await fetch(`/api/watchlist/`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const watchlist = await response.json();
      const productInWatchlist = watchlist.some(item => item.product === productId);
      setIsInWatchlist(productInWatchlist);
    } catch (error) {
      console.error('Error checking watchlist:', error);
    }
  };

  const handleWatchlistToggle = async () => {
    if (!user) return;

    try {
      if (isInWatchlist) {
        await fetch(`/api/watchlist/${product.id}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
      } else {
        await fetch(`/api/watchlist/`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({ product: product.id }),
        });
      }
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      {product.images.length > 0 ? (
        <Carousel>
          {product.images.map((image) => (
            <Carousel.Item key={image.id}>
              <img
                className="d-block w-75"
                src={image.image_url}
                alt={`Slide ${image.id}`}
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <p>Uploaded on: {new Date(image.uploaded_at).toLocaleDateString()}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>No images available</p>
      )}

      {user && (
        <Button onClick={handleWatchlistToggle} variant={isInWatchlist ? 'danger' : 'primary'}>
          {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </Button>
      )}
    </div>
  );
};

export default ProductDetails;
