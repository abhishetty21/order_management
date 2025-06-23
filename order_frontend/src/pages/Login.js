import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'demoUser' && password === 'demo') {
      localStorage.setItem('username', username);
      navigate('/dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  const fillDemoCredentials = () => {
    setUsername('demoUser');
    setPassword('demo');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Unloadin Login Page</h1>

        {/* Demo credentials info box */}
        <div className="bg-blue-50 border border-blue-300 text-blue-800 text-sm p-4 rounded mb-6 shadow-sm">
          <p className="font-semibold mb-1">Demo Credentials</p>
          <p><strong>Username:</strong> demoUser</p>
          <p><strong>Password:</strong> demo</p>
          <button
            onClick={fillDemoCredentials}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm transition"
          >
            Fill Credentials
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition"
          >
            Login
          </button>

          <p className="text-xs text-center text-gray-500 pt-2">
            
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
