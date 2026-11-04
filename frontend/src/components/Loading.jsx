import React from 'react';

const Loading = ({ message = 'Loading agricultural data...' }) => {
  return (
    <div className="spinner-container" style={{ flexDirection: 'column', gap: '1rem' }}>
      <div className="spinner"></div>
      <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{message}</p>
    </div>
  );
};

export default Loading;
