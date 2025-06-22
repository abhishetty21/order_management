import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-login on load for demo
    localStorage.setItem('username', 'demoUser');
    navigate('/dashboard');
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <p>Username: <strong>demoUser</strong></p>
        <p>Password: <strong>demo</strong></p>
        <p className="mt-4 text-sm text-gray-500">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default Login;
