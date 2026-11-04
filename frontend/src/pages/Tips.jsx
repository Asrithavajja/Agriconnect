import React, { useEffect, useState } from 'react';
import { tipService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { Lightbulb, Tag, CheckCircle2 } from 'lucide-react';

const categoriesList = [
  'All Categories',
  'Soil Health',
  'Water Management',
  'Crop Selection',
  'Organic Farming',
  'Pest Management',
  'Fertilizer Awareness',
  'Sustainable Agriculture'
];

const Tips = () => {
  const [tips, setTips] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const fetchTips = async (categoryFilter = '') => {
    setLoading(true);
    setError('');
    try {
      const catParam = categoryFilter === 'All Categories' ? '' : categoryFilter;
      const data = await tipService.getTips(catParam);
      setTips(data);
    } catch (err) {
      console.error(err);
      setError(t('common.error', 'Failed to fetch agricultural tips from server.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="tips-page">
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div className="page-header">
          <h1>{t('tips.title', 'Expert Farming Tips & Best Practices')}</h1>
          <p>{t('tips.subtitle', 'Practical, field-tested guidance to maximize yield, reduce input costs, and protect crop health.')}</p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem' }}
            >
              <Tag size={14} /> {cat === 'All Categories' ? t('crops.resetBtn', 'All Categories') : cat}
            </button>
          ))}
        </div>

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <Loading message={t('common.loading', 'Fetching farming tips...')} />
        ) : tips.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <Lightbulb size={48} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
            <h3>{t('tips.noTips', 'No Tips Found')}</h3>
            <p style={{ color: 'var(--text-muted)' }}>No tips available for "{selectedCategory}".</p>
          </div>
        ) : (
          <div className="card-grid">
            {tips.map((tip) => (
              <div key={tip._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span className="badge badge-warning">{tip.category}</span>
                    <Lightbulb size={22} color="var(--secondary)" />
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#111827' }}>{tip.title}</h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, flex: 1 }}>
                    {tip.description}
                  </p>

                  <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                    <CheckCircle2 size={16} /> Verified Field Recommendation
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

export default Tips;
