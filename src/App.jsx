import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import UserProfile from './components/User/UserProfile';
import SigninForm from './components/Auth/SigninForm';
import SignupForm from './components/Auth/SignupForm';
import AdminPanel from './components/Admin/AdminPanel';
import CreateProduct from './components/Products/CreateProduct';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/create-product" element={<CreateProduct />} />
        
      </Routes>
    </Router>
  );
};

export default App;
