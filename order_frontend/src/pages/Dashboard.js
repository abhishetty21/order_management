import { useState, useEffect } from 'react';
import Header from '../components/Header';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import SearchFilter from '../components/SearchFilter';
import api from '../api/orders';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Load all orders
  const fetchOrders = async () => {
    const data = await api.getOrders(1000);  // fetch more if needed
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, [refresh]);

  // ✅ FIX: prevent 422 when search is empty
  const handleSearch = async (query) => {
    if (!query.trim()) {
      fetchOrders();  // reset to full list
      return;
    }

    try {
      const result = await api.searchOrders(query);
      setOrders(result);
    } catch (err) {
      console.error("Search error:", err.response?.data || err.message);
    }
  };

  // Filter handler
  const handleFilter = async (status) => {
    try {
      const result = await api.filterOrders(status);
      setOrders(result);
    } catch (err) {
      console.error("Filter error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Header />
      <OrderForm onRefresh={() => setRefresh(prev => !prev)} />
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
      <OrderList orders={orders} onRefresh={() => setRefresh(prev => !prev)} />
    </div>
  );
};

export default Dashboard;
