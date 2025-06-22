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
    const data = await api.getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, [refresh]);

  // Search by name, mobile, item name, count/weight
  const handleSearch = async (query) => {
    const result = await api.searchOrders(query);
    setOrders(result);
  };

  // Filter by status (Pending, Processing, Delivered, Canceled)
  const handleFilter = async (status) => {
    const result = await api.filterOrders(status);
    setOrders(result); // ✅ updates list
  };
  
  <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
  

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Header />
      <OrderForm onRefresh={() => setRefresh(!refresh)} />
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
      <OrderList orders={orders} onRefresh={() => setRefresh(!refresh)} />
    </div>
  );
};

export default Dashboard;
