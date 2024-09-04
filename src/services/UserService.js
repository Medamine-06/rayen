import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user'; // Update the URL as needed

const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/find/${id}`);
  return response.data;
};

const getAllUsers = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
};
