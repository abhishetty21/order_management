import { useState } from 'react';
import api from '../api/orders';

const SearchFilter = ({ onRefresh }) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState(null);

  const handleSearch = async () => {
    try {
      const result = await api.searchOrders(search);
      if (result.length === 0) {
        setMessage("No matching orders found.");
      } else {
        setMessage(null);
      }
      onRefresh();
    } catch (err) {
      setMessage("Search failed.");
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleFilter = async () => {
    try {
      const result = await api.filterOrders(status);
      if (result.length === 0) {
        setMessage("No orders for selected status.");
      } else {
        setMessage(null);
      }
      onRefresh();
    } catch (err) {
      setMessage("Filter failed.");
    }
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="mb-4">
      {message && (
        <div className="mb-2 p-2 bg-red-100 border border-red-400 rounded text-red-700">
          {message}
        </div>
      )}
      <div className="flex space-x-4">
        <input className="border p-2 rounded" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..." />
        <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2 rounded">Search</button>

        <select className="border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">--Filter Status--</option>
          {['Pending', 'Processing', 'Delivered', 'Canceled'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={handleFilter} className="bg-blue-600 text-white px-4 py-2 rounded">Filter</button>
      </div>
    </div>
  );
};

export default SearchFilter;
