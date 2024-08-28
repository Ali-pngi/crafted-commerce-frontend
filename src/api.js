// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust the URL as needed

// Example function to fetch products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Example function to handle user sign-in
export const signIn = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin/`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Add more functions as needed for other endpoints
