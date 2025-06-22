import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../services/api';
import Header from '../components/header';
import Input from '../components/Input';
import Table from '../components/table';
import '../styles/orderpage.css';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, [page, search]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders(page, {}, search);
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="orders-page">
      <Header title="Order List" onLogout={handleLogout} />

      <Input
        placeholder="Search orders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '300px' }}
      />

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <Table
          data={orders}
          columns={[
            { label: 'ID', key: 'id' },
            { label: 'Customer', key: 'customer_name' },
            { label: 'Status', key: 'status' },
            { label: 'Date', key: 'date' },
          ]}
        />
      )}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span> Page {page} </span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default OrdersPage;
