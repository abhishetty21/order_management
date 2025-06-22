import { useState, useEffect } from 'react';
import api from '../api/orders';
import OrderDetails from './OrderDetails';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false); // ✅ trigger re-fetch

  const fetchOrders = async () => {
    const data = await api.getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, [refreshFlag]); // ✅ whenever refreshFlag changes, reload orders

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-gray-100 p-4 rounded shadow cursor-pointer"
            onClick={() => setSelected(order.id)}
          >
            <p><strong>{order.item_name}</strong> - {order.name}</p>
            <p className="text-sm text-gray-500">Status: {order.status}</p>
          </div>
        ))}
      </div>
      {selected && (
        <OrderDetails
          id={selected}
          onClose={() => setSelected(null)}
          onRefresh={() => setRefreshFlag(!refreshFlag)} // ✅ trigger re-fetch after update
        />
      )}
    </div>
  );
};

export default OrderList;
