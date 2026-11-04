import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cropService, schemeService, tipService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { Sprout, ShieldCheck, CloudSun, BookOpen, ArrowRight, CheckCircle2, Leaf, Droplets } from 'lucide-react';

const Home = () => {
  const [featuredCrops, setFeaturedCrops] = useState([]);
  const [schemesCount, setSchemesCount] = useState(0);
  const [tipsCount, setTipsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cropsData = await cropService.getCrops();
        setFeaturedCrops(cropsData.slice(0, 3));

        const schemesData = await schemeService.getSchemes();
        setSchemesCount(schemesData.length);

        const tipsData = await tipService.getTips();
        setTipsCount(tipsData.length);
      } catch (err) {
        console.error('Failed to load home page preview data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, rgba(27, 67, 50, 0.92) 0%, rgba(45, 106, 79, 0.85) 100%), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          padding: '5rem 0 6rem 0',
          textAlign: 'center'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '1.25rem',
                backdropFilter: 'blur(8px)'
              }}
            >
              <Sprout size={18} color="#52b788" /> {t('home.heroBadge', '🌾 Empowering Farmers with Modern Agriculture Knowledge')}
            </span>

            <h1
              style={{
                fontSize: '3rem',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '1.25rem',
                lineHeight: 1.15
              }}
            >
              {t('home.heroTitle', 'Smart Farming for Better Crop Yields & Sustainable Growth')}
            </h1>

            <p
              style={{
                fontSize: '1.2rem',
                color: '#e5e7eb',
                marginBottom: '2rem',
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              {t('home.heroSubtitle', 'Access comprehensive crop cultivation guides, real-time weather forecasts, government welfare schemes, and expert agricultural advice all in one place.')}
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/crops" className="btn btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
                {t('home.exploreCrops', 'Explore Crop Library')} <ArrowRight size={18} />
              </Link>
              <Link to="/schemes" className="btn btn-outline" style={{ color: '#ffffff', borderColor: '#ffffff', padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
                {t('home.viewSchemes', 'Government Schemes')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights Stats Bar */}
      <section style={{ backgroundColor: '#ffffff', padding: '2rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              textAlign: 'center'
            }}
          >
            <div>
              <h3 style={{ fontSize: '2.2rem', color: 'var(--primary)', fontWeight: 800 }}>{t('home.statFarmers', '10,000+')}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('home.statFarmers', 'Registered Farmers')}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.2rem', color: 'var(--secondary)', fontWeight: 800 }}>{schemesCount || 5}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('home.statSchemes', 'Government Schemes')}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.2rem', color: 'var(--accent)', fontWeight: 800 }}>{tipsCount || 10}+</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('home.statTips', 'Expert Farming Tips')}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.2rem', color: '#10b981', fontWeight: 800 }}>{t('home.statCrops', '20+')}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('home.statCrops', 'Detailed Crops')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Crops Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h2 className="section-title">{t('home.popularCropsTitle', 'Popular Agricultural Crops')}</h2>
              <p className="section-subtitle">{t('home.popularCropsSubtitle', 'Discover optimal soil, climate, and cultivation guidelines for key crops.')}</p>
            </div>
            <Link to="/crops" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
              {t('home.viewAllCrops', 'View All Crops')} <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <Loading message={t('common.loading', 'Fetching popular crops...')} />
          ) : (
            <div className="card-grid">
              {featuredCrops.map((crop) => (
                <div key={crop._id} className="card">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'; }}
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <span className="badge badge-primary">{crop.season}</span>
                    <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>{crop.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                      {crop.description.substring(0, 100)}...
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '1.2rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <Leaf size={14} color="var(--primary)" /> {crop.soilType.split('&')[0]}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <Droplets size={14} color="#0284c7" /> {crop.waterRequirement.split(' ')[0]} {t('crops.waterLabel', 'Water')}
                      </span>
                    </div>
                    <Link to={`/crops/${crop._id}`} className="btn btn-primary btn-block" style={{ fontSize: '0.85rem' }}>
                      {t('crops.viewDetails', 'View Crop Details')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Awareness Categories Feature Banner */}
      <section style={{ backgroundColor: '#ffffff', padding: '4rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <h2 className="section-title">{t('awareness.title', 'Comprehensive Agriculture Awareness')}</h2>
            <p className="section-subtitle">{t('awareness.subtitle', 'Promoting sustainable agricultural practices through scientific knowledge sharing.')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Leaf size={28} color="var(--primary)" />
              </div>
              <h3>{t('awareness.catSoil', 'Soil Health & Testing')}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {t('awareness.catSoilDesc', 'Learn how regular soil testing prevents nutrient deficiency and enhances organic carbon content.')}
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Droplets size={28} color="#0284c7" />
              </div>
              <h3>{t('awareness.catWater', 'Smart Water Management')}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {t('awareness.catWaterDesc', 'Optimize irrigation using drip systems, rainwater harvesting, and soil moisture monitoring.')}
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <ShieldCheck size={28} color="var(--secondary)" />
              </div>
              <h3>{t('awareness.catPest', 'Organic & Pest Advisory')}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {t('awareness.catPestDesc', 'Adopt biological pest control and bio-fertilizers to produce healthier crops safely.')}
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/awareness" className="btn btn-primary">
              {t('awareness.readMore', 'Explore All Awareness Modules')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
