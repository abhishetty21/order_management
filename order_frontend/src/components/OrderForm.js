import { useState } from 'react';
import api from '../api/orders';

const OrderForm = ({ onRefresh }) => {
  const [form, setForm] = useState({
    name: '', mobile: '', item_name: '', count_or_weight: '', price: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.createOrder(form);
    setForm({ name: '', mobile: '', item_name: '', count_or_weight: '', price: '' });
    onRefresh();
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 shadow rounded mb-4 grid grid-cols-2 gap-4">
      {Object.keys(form).map(field => (
        <input key={field} name={field} placeholder={field.replace(/_/g, ' ')}
          value={form[field]} onChange={handleChange}
          className="p-2 border rounded" required />
      ))}
      <button className="col-span-2 bg-blue-600 text-white py-2 rounded" type="submit">Create Order</button>
    </form>
  );
};

export default OrderForm;
