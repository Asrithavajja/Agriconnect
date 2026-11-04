import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CloudSun, Sun, CloudRain, Wind, Droplets, MapPin, AlertCircle, CheckCircle } from 'lucide-react';

const mockWeatherData = {
  'New Delhi': { temp: 32, humidity: 65, wind: 14, condition: 'Partly Cloudy', rainProb: '10%', advisory: 'Favorable conditions for field preparation and crop harvesting. Low rain risk.' },
  'Punjab (Ludhiana)': { temp: 28, humidity: 72, wind: 10, condition: 'Sunny / Mild', rainProb: '5%', advisory: 'Ideal time for wheat sowing and light drip irrigation.' },
  'Maharashtra (Nashik)': { temp: 29, humidity: 80, wind: 18, condition: 'Moderate Rain', rainProb: '85%', advisory: 'Heavy precipitation forecast. Pause pesticide spraying and clear field drainage channels.' },
  'Karnataka (Bengaluru)': { temp: 26, humidity: 60, wind: 12, condition: 'Pleasant', rainProb: '15%', advisory: 'Optimal weather for horticultural spraying and soil mulching.' },
  'Uttar Pradesh (Lucknow)': { temp: 34, humidity: 55, wind: 15, condition: 'Sunny & Dry', rainProb: '0%', advisory: 'High evaporation rate. Ensure adequate irrigation for standing sugarcane and paddy crops.' }
};

const Weather = () => {
  const [city, setCity] = useState('New Delhi');
  const [selectedWeather, setSelectedWeather] = useState(mockWeatherData['New Delhi']);
  const [customInput, setCustomInput] = useState('');
  const { t } = useLanguage();

  const handleSelectCity = (cityName) => {
    setCity(cityName);
    if (mockWeatherData[cityName]) {
      setSelectedWeather(mockWeatherData[cityName]);
    } else {
      setSelectedWeather({
        temp: 30,
        humidity: 65,
        wind: 12,
        condition: 'Clear Sky',
        rainProb: '15%',
        advisory: `Agricultural Weather Advisory for ${cityName}: Normal seasonal temperature. Safe for routine field activities.`
      });
    }
  };

  const handleCustomSearch = (e) => {
    e.preventDefault();
    if (customInput.trim()) {
      handleSelectCity(customInput.trim());
    }
  };

  return (
    <div className="weather-page">
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div className="page-header">
          <h1>{t('weather.title', 'Agricultural Weather Portal')}</h1>
          <p>{t('weather.subtitle', 'Real-time micro-climate forecast and customized field activity advisories for farmers.')}</p>
        </div>

        {/* Quick City Selector Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {Object.keys(mockWeatherData).map((cityName) => (
            <button
              key={cityName}
              onClick={() => handleSelectCity(cityName)}
              className={`btn ${city === cityName ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.88rem', padding: '0.5rem 1rem' }}
            >
              <MapPin size={14} /> {cityName}
            </button>
          ))}
        </div>

        {/* Search Custom Location */}
        <div style={{ maxWidth: '480px', margin: '0 auto 2.5rem auto' }}>
          <form onSubmit={handleCustomSearch} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder={t('weather.searchPlaceholder', 'Enter district or city name...')}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary">
              {t('weather.getWeather', 'Get Weather Forecast')}
            </button>
          </form>
        </div>

        {/* Main Weather Card */}
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem' }}>
                <MapPin size={18} /> {t('weather.currentWeather', 'Current Location')}: {city}
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.2rem' }}>{selectedWeather.temp}°C</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{selectedWeather.condition}</p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <CloudSun size={72} color="var(--primary)" />
            </div>
          </div>

          {/* Meteorological Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <Droplets size={22} color="#0284c7" style={{ marginBottom: '0.4rem' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('weather.humidity', 'HUMIDITY')}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{selectedWeather.humidity}%</div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <Wind size={22} color="var(--primary)" style={{ marginBottom: '0.4rem' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('weather.windSpeed', 'WIND SPEED')}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{selectedWeather.wind} km/h</div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <CloudRain size={22} color="#7c3aed" style={{ marginBottom: '0.4rem' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('weather.rainfall', 'PRECIPITATION')}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{selectedWeather.rainProb}</div>
            </div>
          </div>

          {/* Agricultural Action Advisory */}
          <div style={{ backgroundColor: 'var(--primary-light)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-hover)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
              <CheckCircle size={20} color="var(--primary)" /> {t('weather.advisoryTitle', 'Farming Operation Advisory')}
            </h4>
            <p style={{ color: '#1f2937', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {selectedWeather.advisory}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
