import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ErrorMessage from '../components/ErrorMessage';
import { UserPlus, User, Mail, Lock } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(t('contact.name', 'Please enter your full name.'));
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError(t('contact.email', 'Please enter a valid email address.'));
      return;
    }

    if (!password || password.length < 6) {
      setError(t('auth.passwordLabel', 'Password must be at least 6 characters long.'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('auth.passwordLabel', 'Password and Confirm Password do not match.'));
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || t('common.error', 'Registration failed. User may already exist with this email.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page" style={{ padding: '3rem 1.5rem' }}>
      <div className="container">
        <div className="card" style={{ maxWidth: '480px', margin: '0 auto', padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <UserPlus size={28} color="var(--primary)" />
            </div>
            <h1 style={{ fontSize: '1.75rem' }}>{t('auth.registerTitle', 'Create AgriConnect Account')}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {t('auth.registerSubtitle', 'Join AgriConnect for advisory and scheme updates')}
            </p>
          </div>

          {error && <ErrorMessage message={error} />}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t('auth.nameLabel', 'Full Name')} *</label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="e.g. Suresh Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('auth.emailLabel', 'Email Address')} *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="suresh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('auth.passwordLabel', 'Password')} *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">{t('auth.passwordLabel', 'Confirm Password')} *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }} disabled={loading}>
              {loading ? t('common.loading', 'Creating Account...') : t('auth.registerBtn', 'Register Account')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {t('auth.haveAccount', 'Already have an account?')}{' '}
            <Link to="/login" style={{ fontWeight: 700, color: 'var(--primary)' }}>
              {t('auth.clickLogin', 'Login Here')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
