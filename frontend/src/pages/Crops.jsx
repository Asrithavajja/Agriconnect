import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cropService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { Search, Sprout, Leaf, Droplets, Sun, Calendar } from 'lucide-react';

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const fetchCrops = async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const data = await cropService.getCrops(query);
      setCrops(data);
    } catch (err) {
      console.error(err);
      setError(t('common.error', 'Failed to fetch crops from server. Please verify backend service.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops('');
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCrops(searchTerm);
  };

  return (
    <div className="crops-page">
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div className="page-header">
          <h1>{t('crops.title', 'Agricultural Crop Library')}</h1>
          <p>{t('crops.subtitle', 'Explore detailed cultivation parameters, soil preferences, climate needs, and water guidelines.')}</p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search
                size={20}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                className="form-control"
                placeholder={t('crops.searchPlaceholder', 'Search crops by name, season, or soil type (e.g. Wheat, Kharif, Loam)...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {t('crops.searchBtn', 'Search')}
            </button>
          </form>
        </div>

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <Loading message={t('common.loading', 'Loading crop library...')} />
        ) : crops.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <Sprout size={48} color="var(--text-light)" style={{ marginBottom: '1rem' }} />
            <h3>{t('crops.noCropsTitle', 'No Crops Found')}</h3>
            <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem 0' }}>
              {t('crops.noCropsDesc', 'No crop matched your search query.')} "{searchTerm}".
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                fetchCrops('');
              }}
              className="btn btn-outline"
            >
              {t('crops.resetBtn', 'Reset Search Filter')}
            </button>
          </div>
        ) : (
          <div className="card-grid">
            {crops.map((crop) => (
              <div key={crop._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <img
                  src={crop.image}
                  alt={crop.name}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'; }}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-primary">{crop.season}</span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{crop.name}</h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    {crop.description.length > 110 ? `${crop.description.substring(0, 110)}...` : crop.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', backgroundColor: 'var(--bg-main)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Leaf size={16} color="var(--primary)" />
                      <span><strong>{t('crops.soilLabel', 'Soil')}:</strong> {crop.soilType}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Droplets size={16} color="#0284c7" />
                      <span><strong>{t('crops.waterLabel', 'Water')}:</strong> {crop.waterRequirement}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sun size={16} color="#d97706" />
                      <span><strong>{t('crops.climateLabel', 'Climate')}:</strong> {crop.climate}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto' }}>
                    <Link to={`/crops/${crop._id}`} className="btn btn-primary btn-block">
                      {t('crops.viewDetails', 'View Crop Details')}
                    </Link>
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

export default Crops;
