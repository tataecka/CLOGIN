// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import api from './lib/api';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const companyData = localStorage.getItem('company');

    if (token && companyData) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const company = JSON.parse(companyData);
      document.documentElement.style.setProperty('--primary', company.primary_color || '#3490dc');
      document.documentElement.style.setProperty('--accent', company.accent_color || '#6b7280');
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token, company) => {
    const primary = company?.primary_color || '#3490dc';
    const accent = company?.accent_color || '#6b7280';

    localStorage.setItem('token', token);
    localStorage.setItem('company', JSON.stringify(company));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    document.documentElement.style.setProperty('--primary', primary);
    document.documentElement.style.setProperty('--accent', accent);
    setIsAuthenticated(true);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('company');
    delete api.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={login} api={api} />} />
      <Route
        path="/*"
        element={
          isAuthenticated ? <Dashboard onLogout={logout} api={api} /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}