import axios from 'axios';

const BASE = 'http://127.0.0.1:8000/orders';

const api = {
  getOrders: async () => (await axios.get(BASE)).data,
  getOrder: async (id) => (await axios.get(`${BASE}/${id}`)).data,
  createOrder: async (data) => (await axios.post(BASE, data)).data,
  updateOrder: async (id, data) => (await axios.put(`${BASE}/${id}`, data)).data,
  deleteOrder: async (id) => await axios.delete(`${BASE}/${id}`),
  searchOrders: async (q) => (await axios.get(`${BASE}/search/${q}`)).data,
  filterOrders: async (status) => (await axios.get(`${BASE}/filter/status/${status}`)).data,
};

export default api;
