import { useState } from 'react';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const handleFilter = () => {
    if (status) {
      onFilter(status); // ✅ calls parent Dashboard's handler
    }
  };

  return (
    <div className="mb-4 flex flex-col md:flex-row items-center gap-2">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={() => onSearch(query)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      {/* Filter */}
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Delivered">Delivered</option>
        <option value="Canceled">Canceled</option>
      </select>

      <button
        onClick={handleFilter}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Filter
      </button>
    </div>
  );
};

export default SearchFilter;
