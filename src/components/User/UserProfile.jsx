import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProducts, getUserWatchlist } from '../../services/userService';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const [userProducts, userWatchlist] = await Promise.all([
          user.role === 'admin' ? getUserProducts(user.id) : Promise.resolve([]),
          getUserWatchlist(user.id)
        ]);

        setProducts(userProducts);
        setWatchlist(userWatchlist);
      } catch (error) {
        setError('Error fetching user data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (!user) {
    return <p>Please sign in to view your profile.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-profile">
      <h1>Welcome {user.username}</h1>

      {user.role === 'admin' && (
        <>
          <h2>Your Products</h2>
          <div className="products-list">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleCardClick(product.id)}
                  className="product-card-link"
                >
                  <div className="product-card">
                    <header>
                      <h2>{product.title}</h2>
                      <p>{product.owner?.username || 'Admin'} posted on {new Date(product.created_at).toLocaleDateString()}</p>
                    </header>
                    <p>{product.description}</p>
                    {product.images[0]?.image_url && (
                      <div
                        className="upload-image"
                        style={{ backgroundImage: `url(${product.images[0].image_url})` }}
                      ></div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>You have not added any products yet.</p>
            )}
          </div>
        </>
      )}

      <h2>Your Watchlist</h2>
      <div className="watchlist">
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <div key={item.id} className="watchlist-item">
              <p>{item.product.title}</p>
            </div>
          ))
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
