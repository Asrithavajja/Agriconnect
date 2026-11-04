import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ErrorMessage from '../components/ErrorMessage';
import { LogIn, Lock, Mail, Info } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError(t('auth.emailLabel', 'Please enter your email address.'));
      return;
    }

    if (!password) {
      setError(t('auth.passwordLabel', 'Please enter your password.'));
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || t('common.error', 'Login failed. Please check your credentials.'));
    } finally {
      setLoading(false);
    }
  };

  const fillDemoUser = () => {
    setEmail('ramesh@agriconnect.com');
    setPassword('userpassword123');
  };

  const fillDemoAdmin = () => {
    setEmail('admin@agriconnect.com');
    setPassword('adminpassword123');
  };

  return (
    <div className="login-page" style={{ padding: '3rem 1.5rem' }}>
      <div className="container">
        <div className="card" style={{ maxWidth: '450px', margin: '0 auto', padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <LogIn size={28} color="var(--primary)" />
            </div>
            <h1 style={{ fontSize: '1.75rem' }}>{t('auth.loginTitle', 'Farmer & User Login')}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {t('auth.loginSubtitle', 'Access your personalized agriculture dashboard')}
            </p>
          </div>

          {/* Quick Demo Credentials Box */}
          <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', border: '1px solid var(--border)', fontSize: '0.85rem' }}>
            <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Info size={14} /> Quick Demo Login Accounts:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button type="button" onClick={fillDemoUser} className="btn btn-outline" style={{ padding: '0.2rem 0.6rem', fontSize: '0.78rem' }}>
                Fill Farmer Demo
              </button>
              <button type="button" onClick={fillDemoAdmin} className="btn btn-outline" style={{ padding: '0.2rem 0.6rem', fontSize: '0.78rem' }}>
                Fill Admin Demo
              </button>
            </div>
          </div>

          {error && <ErrorMessage message={error} />}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{t('auth.emailLabel', 'Email Address')}</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="ramesh@agriconnect.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('auth.passwordLabel', 'Password')}</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }} disabled={loading}>
              {loading ? t('common.loading', 'Authenticating...') : t('auth.loginBtn', 'Sign In to AgriConnect')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {t('auth.noAccount', "Don't have an account yet?")}{' '}
            <Link to="/register" style={{ fontWeight: 700, color: 'var(--primary)' }}>
              {t('auth.clickRegister', 'Register Here')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
