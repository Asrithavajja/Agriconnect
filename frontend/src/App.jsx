import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Awareness from './pages/Awareness';
import Crops from './pages/Crops';
import CropDetails from './pages/CropDetails';
import Schemes from './pages/Schemes';
import Weather from './pages/Weather';
import Tips from './pages/Tips';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/awareness" element={<Awareness />} />
              <Route path="/crops" element={<Crops />} />
              <Route path="/crops/:id" element={<CropDetails />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
