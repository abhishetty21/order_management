import { useState } from 'react';
import api from '../api/orders';

const OrderForm = ({ onRefresh }) => {
  const [form, setForm] = useState({
    name: '', mobile: '', item_name: '', count_or_weight: '', price: ''
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.createOrder(form);
      setMessage("Order created successfully!");
      setForm({ name: '', mobile: '', item_name: '', count_or_weight: '', price: '' });
      onRefresh();
    } catch (err) {
      setMessage("Failed to create order.");
    }
    setTimeout(() => setMessage(null), 3000); // auto-dismiss
  };

  return (
    <div className="mb-4">
      {message && (
        <div className="mb-2 p-2 bg-blue-100 border border-blue-400 rounded text-blue-700">
          {message}
        </div>
      )}
      <form onSubmit={submit} className="bg-white p-4 shadow rounded grid grid-cols-2 gap-4">
        {Object.keys(form).map(field => (
          <input key={field} name={field} placeholder={field.replace(/_/g, ' ')}
            value={form[field]} onChange={handleChange}
            className="p-2 border rounded" required />
        ))}
        <button className="col-span-2 bg-blue-600 text-white py-2 rounded" type="submit">Create Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
