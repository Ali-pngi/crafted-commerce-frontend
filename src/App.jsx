import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import UserProfile from './components/User/UserProfile';
import SigninForm from './components/Auth/SigninForm';
import SignupForm from './components/Auth/SignupForm';
import CreateProduct from './components/Products/CreateProduct';
import EditProduct from './components/Products/EditProduct';
import Logo from './components/Logo/Logo';
import ProductDetails from './components/ProductDetails/ProductDetails';
import './App.css'


const App = () => {
  const { user } = useAuth(); 

  return (
    <>
      <Logo />
      <Navbar />
      <Routes>
        <Route path="/" element={<IndexPage user={user} />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} /> 
        <Route path="/products/:id/edit" element={<EditProduct />} />
      </Routes>
    </>
  );
};

export default App;
