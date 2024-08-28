import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.scss';

const UserProfile = ({ user }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const userProducts = await productService.getUserProducts(user._id);
      setProducts(userProducts);
    };

    fetchProducts();
  }, [user._id]);

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="user-profile">
      <h1>Welcome {user.username}</h1>
      <h2>Your Products</h2>
      <div className="products-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div 
              key={product._id} 
              onClick={() => handleCardClick(product._id)} 
              className="product-card-link"
            >
              <div className="product-card">
                <header>
                  <h2>{product.productName}</h2>
                  <p>
                    {product.user.username} posted on{' '}
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </header>
                <p>{product.description}</p>
                {product.image && (
                  <div className="upload-image" style={{ backgroundImage: `url(${product.image})` }}></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>You have not watched any products yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
