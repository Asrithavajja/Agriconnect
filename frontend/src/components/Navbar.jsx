import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Menu, X, User as UserIcon, LogOut, LayoutDashboard, Globe } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <Sprout size={28} color="#2d6a4f" />
          Agri<span>Connect</span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
              {t('nav.home', 'Home')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
              {t('nav.about', 'About')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/awareness" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
              {t('nav.awareness', 'Awareness')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/crops" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
              {t('nav.crops', 'Crops')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/schemes" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
              {t('nav.schemes', 'Schemes')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/weather" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
              {t('nav.weather', 'Weather')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/tips" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
              {t('nav.tips', 'Tips')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
              {t('nav.contact', 'Contact')}
            </NavLink>
          </li>

          {/* Language Switcher Dropdown */}
          <li>
            <div className="lang-switcher" title={t('nav.selectLanguage', 'Language')}>
              <Globe size={18} color="var(--primary)" />
              <select
                className="lang-switcher-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select Language"
              >
                <option value="en">English</option>
                <option value="te">తెలుగు</option>
              </select>
            </div>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
                  <LayoutDashboard size={18} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  {t('nav.dashboard', 'Dashboard')}
                </NavLink>
              </li>
              <li className="nav-user">
                <span className="user-badge">
                  <UserIcon size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  {user?.name?.split(' ')[0]}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="btn btn-outline"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                >
                  <LogOut size={14} /> {t('nav.logout', 'Logout')}
                </button>
              </li>
            </>
          ) : (
            <li style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 0.9rem' }} onClick={closeMenu}>
                {t('nav.login', 'Login')}
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 0.9rem' }} onClick={closeMenu}>
                {t('nav.register', 'Register')}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
