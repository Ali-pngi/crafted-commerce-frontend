// src/components/Products/ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products/')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product-item">
                    <h2>{product.title}</h2>
                    {product.images.length > 0 ? (
                        <img src={product.images[0].image_url} alt={product.title} />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProductList;
