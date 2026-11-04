import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Leaf, Droplets, Sprout, ShieldCheck, Bug, Zap, Cpu, Globe, CloudSun } from 'lucide-react';

const awarenessCategories = [
  {
    id: 'soil-health',
    titleKey: 'awareness.catSoil',
    descKey: 'awareness.catSoilDesc',
    title: 'Soil Health & Testing',
    icon: Leaf,
    color: '#2d6a4f',
    bgColor: '#d8f3dc',
    description: 'Soil is a living ecosystem. Regular soil testing measures pH, organic carbon, and essential macro/micronutrient reserves.',
    tips: [
      'Test soil once every 2 years before sowing Kharif or Rabi crops.',
      'Maintain optimal soil pH between 6.0 and 7.5 for maximum nutrient availability.',
      'Incorporate green manure crops like Dhaincha or Sunhemp to enrich organic matter.'
    ]
  },
  {
    id: 'water-management',
    titleKey: 'awareness.catWater',
    descKey: 'awareness.catWaterDesc',
    title: 'Smart Water Management',
    icon: Droplets,
    color: '#0284c7',
    bgColor: '#e0f2fe',
    description: 'Efficient water utilization prevents waterlogging, reduces electricity costs, and protects precious groundwater reserves.',
    tips: [
      'Install drip irrigation for horticulture crops to achieve 90%+ water application efficiency.',
      'Practice alternate wetting and drying (AWD) in paddy fields to conserve 25% water.',
      'Construct farm ponds to store monsoon runoff water for dry spells.'
    ]
  },
  {
    id: 'organic-farming',
    titleKey: 'awareness.catOrganic',
    descKey: 'awareness.catOrganicDesc',
    title: 'Organic Farming Guidelines',
    icon: ShieldCheck,
    color: '#15803d',
    bgColor: '#dcfce7',
    description: 'Organic agriculture relies on ecological processes, biodiversity, and natural cycles suited to local conditions.',
    tips: [
      'Use well-decomposed Farmyard Manure (FYM) or Vermicompost (5-10 tonnes/hectare).',
      'Apply Jeevamrutha and Panchagavya as liquid bio-stimulants.',
      'Obtain organic certification through PGS-India or NPOP to command premium market prices.'
    ]
  },
  {
    id: 'pest-management',
    titleKey: 'awareness.catPest',
    descKey: 'awareness.catPestDesc',
    title: 'Integrated Pest Management (IPM)',
    icon: Bug,
    color: '#dc2626',
    bgColor: '#fee2e2',
    description: 'IPM combines physical, biological, and chemical strategies to suppress pest populations below economic injury levels.',
    tips: [
      'Install yellow and blue sticky traps (10-15 per acre) for sucking pests like whiteflies and thrips.',
      'Set up pheromone traps to monitor bollworm and fruit borer infestations early.',
      'Release beneficial biological predators like Trichogramma wasps.'
    ]
  }
];

const Awareness = () => {
  const { t } = useLanguage();

  return (
    <div className="awareness-page">
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div className="page-header">
          <h1>{t('awareness.title', 'Agricultural Awareness Hub')}</h1>
          <p>{t('awareness.subtitle', 'Scientific guidelines, sustainable farming methods, and actionable advice across key agricultural domains.')}</p>
        </div>

        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
          {awarenessCategories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div key={cat.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: cat.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <IconComponent size={26} color={cat.color} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem' }}>{t(cat.titleKey, cat.title)}</h3>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    {t(cat.descKey, cat.description)}
                  </p>

                  <div style={{ marginTop: 'auto', backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: cat.color, marginBottom: '0.5rem', fontWeight: 700 }}>
                      {t('tips.category', 'Actionable Farmer Tips')}:
                    </h4>
                    <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {cat.tips.map((tip, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                          <span style={{ color: cat.color, fontWeight: 800 }}>•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Awareness;
