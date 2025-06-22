import { useEffect, useState } from 'react';
import api from '../api/orders';

const OrderDetails = ({ id, onClose, onRefresh }) => {
  const [order, setOrder] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    api.getOrder(id).then((data) => {
      setOrder(data);
      setForm(data);
    });
  }, [id]);

  const update = async () => {
    await api.updateOrder(id, form);
    setEdit(false);
    onRefresh();
  };

  if (!order) return null;

  return (
    <div className="bg-white p-4 rounded shadow">
      {edit ? (
        <>
          {Object.keys(form).map(field => (
            field !== 'id' && <input key={field} name={field} value={form[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
              className="block mb-2 border p-2 rounded w-full" />
          ))}
          <button onClick={update} className="bg-green-600 text-white px-4 py-2 rounded mr-2">Save</button>
          <button onClick={() => setEdit(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">{order.item_name}</h2>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Mobile:</strong> {order.mobile}</p>
          <p><strong>Count/Weight:</strong> {order.count_or_weight}</p>
          <p><strong>Price:</strong> ₹{order.price}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <div className="mt-4">
            <button onClick={() => setEdit(true)} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Edit</button>
            <button onClick={onClose} className="bg-gray-600 text-white px-4 py-2 rounded">Close</button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
