import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import UserProfile from './components/User/UserProfile';
import SigninForm from './components/Auth/SigninForm';
import SignupForm from './components/Auth/SignupForm';
import CreateProduct from './components/Products/CreateProduct';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/create-product" element={<CreateProduct />} />
        
      </Routes>
    </>
  );
};

export default App;
