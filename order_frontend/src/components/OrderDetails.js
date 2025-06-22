import { useEffect, useState } from 'react';
import api from '../api/orders';

const OrderDetails = ({ id, onClose, onRefresh }) => {
  const [order, setOrder] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.getOrder(id)
      .then((data) => {
        setOrder(data);
        setForm(data);
      })
      .catch(() => {
        setMessage("Order not found.");
      });
  }, [id]);

  const update = async () => {
    try {
      const updated = {
        ...form,
        price: parseInt(form.price),
      };
      const updatedOrder = await api.updateOrder(id, updated);
      if (updatedOrder) {
        setMessage("Order updated successfully!");
        setEdit(false);
        setOrder(updatedOrder);
        onRefresh();
      } else {
        setMessage("Failed to update order.");
      }
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      setMessage("Failed to update order.");
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const deleteOrder = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await api.deleteOrder(id);
      setMessage("Order deleted successfully!");
      onClose();       // Close detail view
      onRefresh();     // Refresh order list
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      setMessage("Failed to delete order.");
    }
    setTimeout(() => setMessage(null), 3000);
  };

  if (!order) return null;

  return (
    <div className="bg-white p-4 rounded shadow">
      {message && (
        <div className="mb-2 p-2 bg-green-100 border border-green-400 rounded text-green-700">
          {message}
        </div>
      )}

      {edit ? (
        <>
          {Object.entries(form).map(([field, value]) => {
            if (field === 'id') return null;

            if (field === 'status') {
              return (
                <select
                  key={field}
                  name="status"
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  className="block mb-2 border p-2 rounded w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
                </select>
              );
            }

            return (
              <input
                key={field}
                name={field}
                value={value}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                className="block mb-2 border p-2 rounded w-full"
                placeholder={field}
              />
            );
          })}
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
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => setEdit(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
            <button onClick={onClose} className="bg-gray-600 text-white px-4 py-2 rounded">Close</button>
            <button onClick={deleteOrder} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
