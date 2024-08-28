import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar/NavBar';
import SignIn from './components/Auth/SigninForm';
import SignUp from './components/Auth/SignupForm';
import IndexPage from './components/Index/IndexPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <Router>
      <div className="vh-100 d-flex flex-column">
        {/* Navbar */}
        <header>
          <Navbar />
        </header>

        {/* Main Content */}
        <main className="container-fluid flex-grow-1 d-flex justify-content-center align-items-center">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>

        {/* Optional Footer */}
        <footer className="mt-auto">
          <div className="text-center p-3">
            © 2024 Your Company Name
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
