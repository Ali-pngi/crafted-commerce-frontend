import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { getUserWatchlist, getUserProducts, updateUserProfile, deleteUserAccount } from '../../services/userService'; // Import necessary services

const UserProfile = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userProducts = await getUserProducts(user.id);
        setProducts(userProducts);
        const userWatchlist = await getUserWatchlist(user.id);
        setWatchlist(userWatchlist);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user.id]);

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    try {
      await updateUserProfile(user.id, userData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAccountDelete = async () => {
    try {
      await deleteUserAccount(user.id);
      // Sign out the user or redirect them
      navigate('/signup');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="user-profile">
      <h1>Welcome, {user.username}</h1>
      <div className="profile-image">
        <img src={userData.profileImage} alt={`${user.username}'s profile`} />
      </div>

      {editMode ? (
        <div className="edit-profile">
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <button onClick={handleProfileUpdate}>Save Changes</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={handleEditToggle}>Edit Profile</button>
        </div>
      )}

      <h2>Your Watchlist</h2>
      <div className="watchlist">
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className="product-card-link"
            >
              <div className="product-card">
                <header>
                  <h2>{item.title}</h2>
                </header>
                {item.main_image && (
                  <div className="upload-image" style={{ backgroundImage: `url(${item.main_image})` }}></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>You have not added any products to your watchlist.</p>
        )}
      </div>

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
                  <p>
                    Posted on {new Date(product.created_at).toLocaleDateString()}
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
          <p>You have not added any products yet.</p>
        )}
      </div>

      {user.isAdmin && (
        <div className="admin-section">
          <h2>Admin Panel</h2>
          <button onClick={() => navigate('/create-product')}>Create Product</button>
          {/* Add more admin-specific actions here */}
        </div>
      )}

      <button onClick={handleAccountDelete} className="delete-account-btn">
        Delete Account
      </button>
    </div>
  );
};

export default UserProfile;
