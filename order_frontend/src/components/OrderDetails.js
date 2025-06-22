import React from 'react';

function Table({ data, columns }) {
  if (!data.length) {
    return <p>No data available.</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.label} style={{ border: '1px solid #ccc', padding: '10px' }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id || JSON.stringify(row)}>
            {columns.map((col) => (
              <td key={col.label} style={{ border: '1px solid #ccc', padding: '10px' }}>
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
