// ProductPreview.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import './ProductPreview.css';  // Add this for custom styles if needed

const ProductPreview = ({ product, onWatchlistToggle, isInWatchlist }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card product-preview">
        <img
          src={product.main_image}
          className="card-img-top"
          alt={product.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">Price: ${product.price}</p>
          <Button
            variant={isInWatchlist ? 'danger' : 'primary'}
            onClick={() => onWatchlistToggle(product.id)}
            className="w-100"
          >
            {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
