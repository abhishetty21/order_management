import { useState } from 'react';
import OrderList from './OrderList';

const OrdersPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = () => {
    setRefreshTrigger(prev => prev + 1); // force re-run useEffect
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <OrderList refresh={refreshTrigger} onRefresh={refresh} />
    </div>
  );
};

export default OrdersPage;
