import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cropService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft, Calendar, Leaf, Droplets, Sun, BookOpen } from 'lucide-react';

const CropDetails = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        const data = await cropService.getCropById(id);
        setCrop(data);
      } catch (err) {
        console.error(err);
        setError(t('cropDetails.notFoundDesc', 'Failed to fetch crop details. Crop ID may be invalid.'));
      } finally {
        setLoading(false);
      }
    };

    fetchCropDetails();
  }, [id]);

  if (loading) return <Loading message={t('common.loading', 'Retrieving crop cultivation data...')} />;
  if (error) return <div className="container" style={{ padding: '3rem 1.5rem' }}><ErrorMessage message={error} /><Link to="/crops" className="btn btn-outline"><ArrowLeft size={16} /> {t('cropDetails.backBtn', 'Back to Crops')}</Link></div>;
  if (!crop) return null;

  return (
    <div className="crop-details-page">
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <Link to="/crops" className="btn btn-outline" style={{ marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> {t('cropDetails.backBtn', 'Back to Crop Library')}
        </Link>

        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ position: 'relative', height: '320px', width: '100%' }}>
            <img
              src={crop.image}
              alt={crop.name}
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'; }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                padding: '2rem 2rem 1rem 2rem',
                color: '#ffffff'
              }}
            >
              <span className="badge badge-warning" style={{ marginBottom: '0.5rem' }}>
                {crop.season}
              </span>
              <h1 style={{ fontSize: '2.4rem', color: '#ffffff', fontWeight: 800 }}>{crop.name}</h1>
            </div>
          </div>

          <div className="card-body" style={{ padding: '2.5rem' }}>
            {/* Overview */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>{t('cropDetails.overview', 'Overview')}</h3>
              <p style={{ fontSize: '1.05rem', color: '#374151', lineHeight: 1.7 }}>{crop.description}</p>
            </div>

            {/* Quick Spec Matrix */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2.5rem',
                backgroundColor: 'var(--bg-main)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                  <Calendar size={18} /> {t('cropDetails.season', 'Season')}
                </div>
                <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{crop.season}</p>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                  <Leaf size={18} /> {t('cropDetails.soil', 'Soil Preference')}
                </div>
                <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{crop.soilType}</p>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0284c7', fontWeight: 700, marginBottom: '0.25rem' }}>
                  <Droplets size={18} /> {t('cropDetails.water', 'Water Need')}
                </div>
                <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{crop.waterRequirement}</p>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d97706', fontWeight: 700, marginBottom: '0.25rem' }}>
                  <Sun size={18} /> {t('cropDetails.climate', 'Climate')}
                </div>
                <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{crop.climate}</p>
              </div>
            </div>

            {/* Cultivation Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                <BookOpen size={24} />
                <h3 style={{ fontSize: '1.4rem' }}>{t('cropDetails.cultivationTitle', 'Cultivation & Agricultural Management')}</h3>
              </div>
              <div style={{ backgroundColor: '#ffffff', borderLeft: '4px solid var(--primary)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}>
                <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {crop.cultivationInfo}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;
