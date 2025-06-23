import { useState } from 'react';
import OrderDetails from './OrderDetails';

const OrderList = ({ orders, onRefresh }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        {orders.length === 0 ? (
          <div className="p-4 text-gray-500">No orders to show.</div>
        ) : (
          orders.map(order => (
            <div
              key={order.id}
              className="bg-gray-100 p-4 rounded shadow cursor-pointer hover:bg-gray-200 transition"
              onClick={() => setSelected(order.id)}
            >
              <p><strong>{order.item_name}</strong> - {order.name}</p>
              <p className="text-sm text-gray-500">Status: {order.status}</p>
            </div>
          ))
        )}
      </div>

      {selected && (
        <OrderDetails
          id={selected}
          onClose={() => setSelected(null)}
          onRefresh={onRefresh} // ✅ Trigger dashboard refresh after update
        />
      )}
    </div>
  );
};

export default OrderList;
