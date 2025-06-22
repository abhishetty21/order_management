import axios from 'axios';

const BASE = 'http://localhost:8000/orders';

const api = {
  getOrders: async () => (await axios.get(BASE)).data,
  getOrder: async (id) => (await axios.get(`${BASE}/${id}`)).data,
  createOrder: async (data) => await axios.post(BASE, data),
  updateOrder: async (id, data) => await axios.put(`${BASE}/${id}`, data),
  searchOrders: async (q) => (await axios.get(`${BASE}/search/${q}`)).data,
  filterOrders: async (status) => (await axios.get(`${BASE}/filter/status/${status}`)).data,
};

export default api;
