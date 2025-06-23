import axios from 'axios';

// Use environment variable or fallback to localhost
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const BASE = `${BASE_URL}/orders`;

const api = {
  getOrders: async () => (await axios.get(BASE)).data,
  getOrder: async (id) => (await axios.get(`${BASE}/${id}`)).data,
  createOrder: async (data) => (await axios.post(BASE, data)).data,
  updateOrder: async (id, data) => (await axios.put(`${BASE}/${id}`, data)).data,
  searchOrders: async (q) => (await axios.get(`${BASE}/search/${q}`)).data,
  filterOrders: async (status) => (await axios.get(`${BASE}/filter/status/${status}`)).data,
  deleteOrder: async (id) => (await axios.delete(`${BASE}/${id}`)).data,
};

export default api;