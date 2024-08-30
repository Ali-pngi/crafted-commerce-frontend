import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/Index/IndexPage';
import ProductDetails from './components/ProductDetails/ProductDetails';
import './App.css'; 

const App = () => {
  const user = null; 

  return (
      <Routes>
        <Route path="/" element={<IndexPage user={user} />} />
        <Route path="/product/:id" element={<ProductDetails user={user} />} />
        
      </Routes>
  );
};

export default App;
