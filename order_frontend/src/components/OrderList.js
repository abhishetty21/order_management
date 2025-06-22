import React from 'react';

function Input({ type = "text", placeholder, value, onChange, style = {} }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '10px',
        marginBottom: '12px',
        ...style
      }}
    />
  );
}

export default Input;
