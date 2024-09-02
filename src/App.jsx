import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CreateProduct from './components/Products/CreateProduct';
import SigninForm from './components/Auth/SigninForm';
import SignupForm from './components/Auth/SignupForm';
import UserProfile from './components/User/UserProfile';
import IndexPage from './components/Index/IndexPage';
import useAuth from './hooks/useAuth';
import './App.css';

const App = () => {
  const { user } = useAuth(); 

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<IndexPage user={user} />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/products/:id" element={<ProductDetails user={user} />} />
        <Route path="/create-product" element={user?.role === 'admin' ? <CreateProduct /> : <IndexPage />} />
        <Route path="/profile" element={user ? <UserProfile user={user} /> : <SigninForm />} />
      </Routes>
    </>
  );
};

export default App;
