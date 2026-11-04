import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { cropService, tipService, schemeService, contactService } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { User, Shield, Sprout, Lightbulb, FileText, Plus, Trash2, Mail, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  // Dashboard state
  const [crops, setCrops] = useState([]);
  const [tips, setTips] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form states for adding new Crop
  const [newCrop, setNewCrop] = useState({
    name: '',
    description: '',
    season: 'Kharif (Monsoon)',
    soilType: '',
    waterRequirement: 'Moderate',
    climate: '',
    cultivationInfo: '',
    image: ''
  });

  // Form states for adding new Tip
  const [newTip, setNewTip] = useState({
    title: '',
    description: '',
    category: 'Soil Health'
  });

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const [cropsData, tipsData, schemesData] = await Promise.all([
        cropService.getCrops(),
        tipService.getTips(),
        schemeService.getSchemes()
      ]);

      setCrops(cropsData);
      setTips(tipsData);
      setSchemes(schemesData);

      // If user is logged in, try loading contact messages
      try {
        const msgData = await contactService.getMessages();
        setMessages(msgData);
      } catch (e) {
        // Non-fatal if contact messages fail
      }
    } catch (err) {
      console.error(err);
      setError(t('common.error', 'Failed to sync dashboard data with server.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Handle Crop Creation (CRUD Operation)
  const handleCreateCrop = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!newCrop.name || !newCrop.description || !newCrop.soilType || !newCrop.cultivationInfo) {
      setError(t('common.error', 'Please fill in all required crop details.'));
      return;
    }

    try {
      await cropService.createCrop(newCrop);
      setSuccessMsg(`${t('dashboard.cropName', 'Crop')} "${newCrop.name}" ${t('common.success', 'created successfully!')}`);
      setNewCrop({
        name: '',
        description: '',
        season: 'Kharif (Monsoon)',
        soilType: '',
        waterRequirement: 'Moderate',
        climate: '',
        cultivationInfo: '',
        image: ''
      });
      fetchDashboardData();
    } catch (err) {
      setError(err.response?.data?.message || t('common.error', 'Failed to add crop record.'));
    }
  };

  // Handle Crop Deletion (CRUD Operation)
  const handleDeleteCrop = async (cropId, cropName) => {
    if (window.confirm(`${t('dashboard.confirmDelete', 'Are you sure you want to delete crop')} "${cropName}"?`)) {
      try {
        await cropService.deleteCrop(cropId);
        setSuccessMsg(`Crop "${cropName}" ${t('common.success', 'removed successfully.')}`);
        fetchDashboardData();
      } catch (err) {
        setError(err.response?.data?.message || t('common.error', 'Failed to delete crop record.'));
      }
    }
  };

  // Handle Tip Creation (CRUD Operation)
  const handleCreateTip = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!newTip.title || !newTip.description) {
      setError(t('common.error', 'Please fill in tip title and description.'));
      return;
    }

    try {
      await tipService.createTip(newTip);
      setSuccessMsg(`Tip "${newTip.title}" ${t('common.success', 'published!')}`);
      setNewTip({ title: '', description: '', category: 'Soil Health' });
      fetchDashboardData();
    } catch (err) {
      setError(err.response?.data?.message || t('common.error', 'Failed to publish tip.'));
    }
  };

  if (loading) return <Loading message={t('common.loading', 'Opening farmer dashboard portal...')} />;

  return (
    <div className="dashboard-page" style={{ padding: '2.5rem 1.5rem' }}>
      <div className="container">
        {/* Welcome Banner */}
        <div
          className="card"
          style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
            color: '#ffffff',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-warning" style={{ marginBottom: '0.5rem' }}>
                {t('dashboard.userRole', 'Role')}: {user?.role === 'admin' ? 'Administrator' : 'Verified Farmer'}
              </span>
              <h1 style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 800 }}>
                {t('dashboard.welcome', 'Welcome back,')} {user?.name}! 🌱
              </h1>
              <p style={{ color: '#d8f3dc', fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {t('dashboard.title', 'AgriConnect User Dashboard')} • <strong>{user?.email}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setActiveTab('add-crop')} className="btn btn-secondary">
                <Plus size={16} /> {t('dashboard.addCropBtn', '+ Add New Crop')}
              </button>
            </div>
          </div>
        </div>

        {error && <ErrorMessage message={error} />}
        {successMsg && (
          <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
            <CheckCircle2 size={20} /> <span>{successMsg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid var(--border)', marginBottom: '2rem', overflowX: 'auto' }}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', borderBottom: 'none' }}
          >
            <User size={16} /> {t('dashboard.title', 'Overview')}
          </button>
          <button
            onClick={() => setActiveTab('manage-crops')}
            className={`btn ${activeTab === 'manage-crops' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', borderBottom: 'none' }}
          >
            <Sprout size={16} /> {t('dashboard.myCropsTitle', 'My Managed Crops')} ({crops.length})
          </button>
          <button
            onClick={() => setActiveTab('add-crop')}
            className={`btn ${activeTab === 'add-crop' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', borderBottom: 'none' }}
          >
            <Plus size={16} /> Create Crop Record
          </button>
          <button
            onClick={() => setActiveTab('add-tip')}
            className={`btn ${activeTab === 'add-tip' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', borderBottom: 'none' }}
          >
            <Lightbulb size={16} /> Create Tip
          </button>
          {messages.length > 0 && (
            <button
              onClick={() => setActiveTab('messages')}
              className={`btn ${activeTab === 'messages' ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', borderBottom: 'none' }}
            >
              <Mail size={16} /> Help Messages ({messages.length})
            </button>
          )}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <Sprout size={32} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{crops.length}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Cataloged Crops</p>
              </div>

              <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <FileText size={32} color="var(--secondary)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{schemes.length}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Active Govt Schemes</p>
              </div>

              <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <Lightbulb size={32} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{tips.length}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Published Farming Tips</p>
              </div>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                Recommended Crop Advisory for Your Region
              </h3>
              <div className="card-grid">
                {crops.slice(0, 3).map((crop) => (
                  <div key={crop._id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1rem', backgroundColor: 'var(--bg-main)' }}>
                    <span className="badge badge-primary">{crop.season}</span>
                    <h4 style={{ margin: '0.5rem 0' }}>{crop.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Soil: {crop.soilType}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE CROPS */}
        {activeTab === 'manage-crops' && (
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Crops Inventory (CRUD Operations)</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Crop Name</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Season</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Soil Type</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Water Need</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {crops.map((crop) => (
                    <tr key={crop._id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{crop.name}</td>
                      <td style={{ padding: '0.75rem 1rem' }}><span className="badge badge-primary">{crop.season}</span></td>
                      <td style={{ padding: '0.75rem 1rem' }}>{crop.soilType}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{crop.waterRequirement}</td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => handleDeleteCrop(crop._id, crop.name)}
                          className="btn btn-danger"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CREATE CROP FORM */}
        {activeTab === 'add-crop' && (
          <div className="card" style={{ padding: '2rem', maxWidth: '750px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Create New Crop Entry (POST /api/crops)</h3>

            <form onSubmit={handleCreateCrop}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label>Crop Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Barley / Barley (Hordeum vulgare)"
                    value={newCrop.name}
                    onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Growing Season *</label>
                  <select
                    className="form-control"
                    value={newCrop.season}
                    onChange={(e) => setNewCrop({ ...newCrop, season: e.target.value })}
                  >
                    <option value="Kharif (Monsoon)">Kharif (Monsoon)</option>
                    <option value="Rabi (Winter)">Rabi (Winter)</option>
                    <option value="Zaid (Summer)">Zaid (Summer)</option>
                    <option value="All Season">All Season</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label>Suitable Soil Type *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Sandy Loam / Alluvial Soil"
                    value={newCrop.soilType}
                    onChange={(e) => setNewCrop({ ...newCrop, soilType: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Water Requirement *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Moderate (400-500 mm)"
                    value={newCrop.waterRequirement}
                    onChange={(e) => setNewCrop({ ...newCrop, waterRequirement: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Climate Conditions *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Cool dry climate with temperature 15°C - 25°C"
                  value={newCrop.climate}
                  onChange={(e) => setNewCrop({ ...newCrop, climate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Crop Image URL (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://images.unsplash.com/..."
                  value={newCrop.image}
                  onChange={(e) => setNewCrop({ ...newCrop, image: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Brief Crop Description *</label>
                <textarea
                  className="form-control"
                  placeholder="Overview of crop significance and characteristics..."
                  value={newCrop.description}
                  onChange={(e) => setNewCrop({ ...newCrop, description: e.target.value })}
                  style={{ minHeight: '80px' }}
                />
              </div>

              <div className="form-group">
                <label>Detailed Cultivation Guidelines *</label>
                <textarea
                  className="form-control"
                  placeholder="Sowing dates, seed treatment, irrigation schedule, harvesting advice..."
                  value={newCrop.cultivationInfo}
                  onChange={(e) => setNewCrop({ ...newCrop, cultivationInfo: e.target.value })}
                  style={{ minHeight: '120px' }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                <Plus size={18} /> Save & Publish Crop Record
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: CREATE TIP FORM */}
        {activeTab === 'add-tip' && (
          <div className="card" style={{ padding: '2rem', maxWidth: '650px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Post New Agriculture Tip (POST /api/tips)</h3>

            <form onSubmit={handleCreateTip}>
              <div className="form-group">
                <label>Tip Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Apply Neem Cake to Control Root Nematodes"
                  value={newTip.title}
                  onChange={(e) => setNewTip({ ...newTip, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Tip Category *</label>
                <select
                  className="form-control"
                  value={newTip.category}
                  onChange={(e) => setNewTip({ ...newTip, category: e.target.value })}
                >
                  <option value="Soil Health">Soil Health</option>
                  <option value="Water Management">Water Management</option>
                  <option value="Crop Selection">Crop Selection</option>
                  <option value="Organic Farming">Organic Farming</option>
                  <option value="Pest Management">Pest Management</option>
                  <option value="Fertilizer Awareness">Fertilizer Awareness</option>
                  <option value="Sustainable Agriculture">Sustainable Agriculture</option>
                </select>
              </div>

              <div className="form-group">
                <label>Detailed Description & Farmer Action *</label>
                <textarea
                  className="form-control"
                  placeholder="Explain step-by-step guidance for farmers..."
                  value={newTip.description}
                  onChange={(e) => setNewTip({ ...newTip, description: e.target.value })}
                  style={{ minHeight: '130px' }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                <Lightbulb size={18} /> Publish Advice Tip
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Submitted Support Queries (MongoDB Records)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg) => (
                <div key={msg._id} style={{ border: '1px solid var(--border)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4 style={{ color: 'var(--primary)' }}>{msg.subject}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{msg.message}</p>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    From: <strong>{msg.name}</strong> ({msg.email})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
