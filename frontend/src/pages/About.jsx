import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Target, AlertTriangle, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="about-page">
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div className="page-header">
          <h1>{t('about.title', 'About AgriConnect')}</h1>
          <p>{t('about.subtitle', 'Connecting technology with sustainable agriculture to support farmers and agricultural communities.')}</p>
        </div>

        {/* Section 1: What is AgriConnect? */}
        <section className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Target size={28} color="var(--primary)" />
            <h2 style={{ fontSize: '1.6rem' }}>{t('about.title', 'What is AgriConnect?')}</h2>
          </div>
          <p style={{ fontSize: '1.05rem', color: '#374151', lineHeight: 1.7 }}>
            <strong>AgriConnect</strong> {t('about.subtitle', 'is a comprehensive digital platform built to bridge the gap between agricultural science, government support schemes, and practicing farmers.')}
          </p>
        </section>

        {/* Section 2: Why Agriculture Awareness Matters & Problems Faced by Farmers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <AlertTriangle size={26} color="#d97706" />
              <h3 style={{ fontSize: '1.3rem' }}>{t('about.missionTitle', 'Our Mission')}</h3>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {t('about.missionDesc', 'To bridge the information gap in agriculture by providing farmers with accessible, actionable, and localized farming intelligence.')}
            </p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <ShieldCheck size={26} color="var(--primary)" />
              <h3 style={{ fontSize: '1.3rem' }}>{t('about.visionTitle', 'Our Vision')}</h3>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {t('about.visionDesc', 'To foster sustainable farming practices, enhance agricultural productivity, and elevate farmer livelihoods across the nation.')}
            </p>
          </div>
        </div>

        {/* Section 3: Main Objectives */}
        <section className="card" style={{ padding: '2rem', backgroundColor: 'var(--primary-light)', border: '1px solid var(--accent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <HeartHandshake size={28} color="var(--primary)" />
            <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-hover)' }}>{t('about.valuesTitle', 'Core Values')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ color: 'var(--primary)' }}>{t('about.val1Title', 'Farmer-Centric Solution')}</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{t('about.val1Desc', 'Designing every feature with simplicity and ease of use for rural agricultural communities.')}</p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ color: 'var(--primary)' }}>{t('about.val2Title', 'Scientific Accuracy')}</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{t('about.val2Desc', 'Delivering verified advice sourced from agricultural scientists and extension officers.')}</p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ color: 'var(--primary)' }}>{t('about.val3Title', 'Financial Empowerment')}</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{t('about.val3Desc', 'Helping farmers easily discover and apply for government subsidies and credit cards.')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
