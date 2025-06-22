import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Order Management Dashboard</h1>
      <div>
        <span className="mr-4">User: <strong>{localStorage.getItem('username')}</strong></span>
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Header;
