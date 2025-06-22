import React from 'react';

function Header({ title, onLogout }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    }}>
      <h2>{title}</h2>
      {onLogout && (
        <button onClick={onLogout} style={{ padding: '8px 12px' }}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Header;
