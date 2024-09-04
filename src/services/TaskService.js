import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tasks'; // Ensure this is correct

const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}`, taskData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getTasksByDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/by-date-range`, {
      params: {
        startDate,
        endDate
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Rethrow error for handling in component
  }
};

const getAllTasks = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

const getTaskById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const updateTask = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  getTasksByDateRange,
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
  