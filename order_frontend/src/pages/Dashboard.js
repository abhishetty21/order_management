import Header from '../components/Header';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import SearchFilter from '../components/SearchFilter';
import { useState } from 'react';

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Header />
      <OrderForm onRefresh={() => setRefresh(!refresh)} />
      <SearchFilter onRefresh={() => setRefresh(!refresh)} />
      <OrderList refresh={refresh} />
    </div>
  );
};

export default Dashboard;
