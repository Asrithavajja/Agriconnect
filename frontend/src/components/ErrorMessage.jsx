import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, type = 'danger' }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type}`}>
      <AlertCircle size={20} style={{ flexShrink: 0 }} />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
