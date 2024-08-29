import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import SignIn from './components/Auth/SigninForm';
import SignUp from './components/Auth/SignupForm';
import IndexPage from './components/Index/IndexPage';
import UserProfile from './components/User/UserProfile';
import ProductDetails from './components/ProductDetails/ProductDetails';
import useAuth from './hooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleAddToWatchlist = async (productId) => {
    // Call API to add product to watchlist
    try {
      const response = await fetch(`/api/watchlist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Assuming JWT token
        },
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        alert('Product added to watchlist');
      } else {
        alert('Failed to add product to watchlist');
      }
    } catch (error) {
      console.error('Error adding product to watchlist:', error);
    }
  };

  const handleShowProduct = (productId) => {
    // Navigate to the Product Details page
    navigate(`/products/${productId}`);
  };

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<IndexPage onAddToWatchlist={handleAddToWatchlist} onShowProduct={handleShowProduct} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
