import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="notfound-page" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
      <div className="container">
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Sprout size={36} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)' }}>404</h1>
          <h2 style={{ fontSize: '1.4rem', margin: '0.5rem 0 1rem 0' }}>Agricultural Page Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            The requested page route does not exist or has been moved. Return to AgriConnect home page to continue browsing.
          </p>
          <Link to="/" className="btn btn-primary btn-block">
            <ArrowLeft size={16} /> Return to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
