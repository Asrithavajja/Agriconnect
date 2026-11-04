import React, { useState } from 'react';
import { contactService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import ErrorMessage from '../components/ErrorMessage';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const { t } = useLanguage();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Form Validation
    if (!formData.name.trim()) {
      setError(t('contact.name', 'Please enter your full name.'));
      return;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError(t('contact.email', 'Please enter a valid email address.'));
      return;
    }

    if (!formData.subject.trim()) {
      setError(t('contact.subject', 'Please enter a message subject.'));
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setError(t('contact.message', 'Please enter a detailed message (at least 10 characters).'));
      return;
    }

    setLoading(true);

    try {
      const response = await contactService.submitContactMessage(formData);
      setSuccessMsg(t('contact.successMsg', 'Thank you! Your message has been submitted. Our agricultural expert will respond shortly.'));
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || t('common.error', 'Failed to submit contact message. Please try again later.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div className="page-header">
          <h1>{t('contact.title', 'Contact Farmer Helpline & Support')}</h1>
          <p>{t('contact.subtitle', 'Have questions about crops, soil health reports, or scheme applications? Get in touch with our team.')}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Contact Details Card */}
          <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--primary)', color: '#ffffff' }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem' }}>{t('contact.officeTitle', 'Helpdesk Information')}</h3>
            <p style={{ color: '#e5e7eb', marginBottom: '2rem', fontSize: '0.95rem' }}>
              {t('contact.subtitle', 'We are dedicated to supporting farmers with reliable agricultural advice and assistance.')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={22} color="var(--accent)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#ffffff' }}>{t('contact.officeAddress', 'Agricultural Center')}</h4>
                  <p style={{ color: '#d1d5db' }}>Agricultural Support Center, Sector 4, India</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Phone size={22} color="var(--accent)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#ffffff' }}>{t('contact.helpline', 'Kisan Toll-Free Helpline')}</h4>
                  <p style={{ color: '#d1d5db' }}>1800-180-1551 ({t('contact.supportHours', 'Mon - Sat: 8:00 AM - 6:00 PM')})</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Mail size={22} color="var(--accent)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#ffffff' }}>{t('contact.email', 'Email Support')}</h4>
                  <p style={{ color: '#d1d5db' }}>support@agriconnect.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>{t('contact.sendBtn', 'Send Us a Message')}</h3>

            {error && <ErrorMessage message={error} />}

            {successMsg && (
              <div className="alert alert-success">
                <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{t('contact.name', 'Your Name')} *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t('contact.email', 'Your Email Address')} *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="e.g. ramesh@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">{t('contact.subject', 'Subject')} *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  placeholder="e.g. Soil Testing Query / Crop Pest Control"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact.message', 'Message')} *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  placeholder="Describe your agricultural question or query in detail..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? t('common.loading', 'Submitting Message...') : <><Send size={18} /> {t('contact.sendBtn', 'Submit Message')}</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
