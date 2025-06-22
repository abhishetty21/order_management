import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import loginpage from './pages/loginpage';
import orderspage from './pages/orderspage';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<loginpage />} />
        <Route
          path="/orders"
          element={token ? <orderspage /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={token ? "/orders" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
