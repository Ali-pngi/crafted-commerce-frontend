// IndexPage.jsx
import React, { useState, useEffect } from 'react';
import ProductPreview from '../Products/ProductPreview';
import { Container, Row } from 'react-bootstrap';

const IndexPage = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchProductPreviews = async () => {
      try {
        const response = await fetch('/api/products/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product previews:', error);
      }
    };

    const fetchWatchlist = async () => {
      if (user) {
        try {
          const response = await fetch('/api/watchlist/');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setWatchlist(data.map(item => item.product));
        } catch (error) {
          console.error('Error fetching watchlist:', error);
        }
      }
    };

    fetchProductPreviews();
    fetchWatchlist();
  }, [user]);

  const handleWatchlistToggle = async (productId) => {
    if (!user) return;

    try {
      if (watchlist.includes(productId)) {
        await fetch(`/api/watchlist/${productId}/`, { method: 'DELETE' });
        setWatchlist(watchlist.filter(id => id !== productId));
      } else {
        await fetch(`/api/watchlist/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product: productId }),
        });
        setWatchlist([...watchlist, productId]);
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  return (
    <Container>
      <Row>
        {products.map(product => (
          <ProductPreview
            key={product.id}
            product={product}
            onWatchlistToggle={handleWatchlistToggle}
            isInWatchlist={watchlist.includes(product.id)}
          />
        ))}
      </Row>
    </Container>
  );
};

export default IndexPage;
