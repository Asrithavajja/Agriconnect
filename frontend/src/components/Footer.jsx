import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#52b788', fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800 }}>
              <Sprout size={24} /> AgriConnect
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              {t('footer.tagline', 'AgriConnect is an integrated full-stack agriculture awareness and support platform empowering farmers with crop advisory, soil health guidance, weather insights, and government schemes.')}
            </p>
          </div>

          <div className="footer-col">
            <h4>{t('footer.quickLinks', 'Quick Links')}</h4>
            <ul>
              <li><Link to="/">{t('nav.home', 'Home')}</Link></li>
              <li><Link to="/about">{t('nav.about', 'About Us')}</Link></li>
              <li><Link to="/awareness">{t('nav.awareness', 'Agricultural Awareness')}</Link></li>
              <li><Link to="/crops">{t('nav.crops', 'Crop Library')}</Link></li>
              <li><Link to="/schemes">{t('nav.schemes', 'Government Schemes')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer.services', 'Farmer Resources')}</h4>
            <ul>
              <li><Link to="/weather">{t('nav.weather', 'Weather Forecast')}</Link></li>
              <li><Link to="/tips">{t('nav.tips', 'Farming Tips')}</Link></li>
              <li><Link to="/contact">{t('nav.contact', 'Support & Helpline')}</Link></li>
              <li><Link to="/dashboard">{t('nav.dashboard', 'Farmer Portal')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer.contactUs', 'Contact Support')}</h4>
            <ul style={{ fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#52b788" /> {t('contact.officeAddress', 'Agricultural Hub, India')}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#52b788" /> {t('contact.helpline', 'Toll-Free Helpline')}: 1800-180-1551
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="#52b788" /> support@agriconnect.org
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AgriConnect. {t('footer.copyright', 'All rights reserved. Dedicated to the Prosperity of Farmers.')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
