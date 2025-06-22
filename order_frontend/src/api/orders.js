import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // Change if backend runs elsewhere

export const login = async (username, password) => {
  if (username === 'admin' && password === 'password') {
    return Promise.resolve({ token: 'mock-token-abc123' });
  }
  return Promise.reject(new Error('Invalid credentials'));
};

export const fetchOrders = async (page = 1, filters = {}, search = '') => {
  let url = `${BASE_URL}/orders?page=${page}&search=${search}`;
  const res = await axios.get(url);
  return res.data;
};
