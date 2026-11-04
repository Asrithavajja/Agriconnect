import React, { useEffect, useState } from 'react';
import { schemeService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { ShieldCheck, UserCheck, Gift, FileText, Info } from 'lucide-react';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const data = await schemeService.getSchemes();
        setSchemes(data);
      } catch (err) {
        console.error(err);
        setError(t('common.error', 'Failed to fetch government schemes from server.'));
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  return (
    <div className="schemes-page">
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div className="page-header">
          <h1>{t('schemes.title', 'Government Agriculture Welfare Schemes')}</h1>
          <p>{t('schemes.subtitle', 'Explore financial assistance, crop insurance subsidies, and infrastructure support schemes.')}</p>
        </div>

        {/* Informational Disclaimer Banner */}
        <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
          <Info size={22} style={{ flexShrink: 0 }} />
          <span>
            <strong>{t('common.details', 'Information')}:</strong> {t('schemes.subtitle', 'Scheme details below provide government assistance, crop insurance, and financial guidance for farmers.')}
          </span>
        </div>

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <Loading message={t('common.loading', 'Loading government scheme records...')} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {schemes.map((scheme) => (
              <div key={scheme._id} className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <h2 style={{ fontSize: '1.4rem', color: '#111827' }}>{scheme.name}</h2>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {scheme.description}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.25rem',
                    backgroundColor: 'var(--bg-main)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                      <UserCheck size={16} /> {t('schemes.eligibility', 'Eligibility Criteria')}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{scheme.eligibility}</p>
                  </div>

                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--secondary)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                      <Gift size={16} /> {t('schemes.benefits', 'Scheme Benefits')}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{scheme.benefits}</p>
                  </div>

                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                      <FileText size={16} /> {t('schemes.howToApply', 'How to Apply')}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{scheme.applicationInfo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schemes;
