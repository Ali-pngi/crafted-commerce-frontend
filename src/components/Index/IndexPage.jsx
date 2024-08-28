// src/components/Index/IndexPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../api';

function IndexPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card mb-4">
              <img src={product.image_url} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndexPage;
