import React, { useState, useEffect } from 'react';
import Product from '../ProductDetails/ProductDetails';

const IndexPage = ({ onAddToWatchlist, onShowProduct }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products'); 
 
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="index-page">
      {products.map(product => (
        <Product
          key={product.id}
          product={product}
          onAddToWatchlist={onAddToWatchlist}
          onShowProduct={onShowProduct}
        />
      ))}
    </div>
  );
};

export default IndexPage;
