import { useEffect, useState } from 'react';
import api from '../api/orders';
import OrderDetails from './OrderDetails';

const OrderList = ({ refresh }) => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.getOrders().then((data) => {
      setOrders(data);
      if (data.length === 0) {
        setMessage("No orders found.");
      } else {
        setMessage(null);
      }
    }).catch(() => {
      setMessage("Failed to fetch orders.");
    });
  }, [refresh]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        {message && (
          <div className="mb-2 p-2 bg-yellow-100 border border-yellow-400 rounded text-yellow-700">
            {message}
          </div>
        )}
        {orders.map(order => (
          <div key={order.id} className="bg-gray-100 p-4 rounded shadow cursor-pointer" onClick={() => setSelected(order.id)}>
            <p><strong>{order.item_name}</strong> - {order.name}</p>
            <p className="text-sm text-gray-500">Status: {order.status}</p>
          </div>
        ))}
      </div>
      {selected && <OrderDetails id={selected} onClose={() => setSelected(null)} onRefresh={refresh} />}
    </div>
  );
};

export default OrderList;
