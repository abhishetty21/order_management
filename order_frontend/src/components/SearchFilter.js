import { useState } from 'react';
import api from '../api/orders';

const SearchFilter = ({ onRefresh }) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = async () => {
    if (search) await api.searchOrders(search);
    onRefresh();
  };

  const handleFilter = async () => {
    if (status) await api.filterOrders(status);
    onRefresh();
  };

  return (
    <div className="flex space-x-4 mb-4">
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
  );
};

export default SearchFilter;
