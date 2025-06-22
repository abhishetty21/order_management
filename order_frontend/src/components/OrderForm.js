import React from 'react';

function Button({ onClick, children, type = 'button', style = {} }) {
  return (
    <button onClick={onClick} type={type} style={{ padding: '10px 16px', ...style }}>
      {children}
    </button>
  );
}

export default Button;
