import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Update the URL as needed

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

const checkLogin = async (token) => {
  const response = await axios.post(`${API_URL}/check`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getLoggedInUser = async (token) => {
  const response = await axios.get(`${API_URL}/loggedinUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  register,
  login,
  checkLogin,
  getLoggedInUser,
};
