import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogOut, Sun, Moon, Users, BarChart3, Settings, Home } from 'lucide-react';
import EmployeesSection from '../components/EmployeesSection';
import AnalyticsSection from '../components/AnalyticsSection';
import SettingsSection from '../components/SettingsSection';
import HomeSection from '../components/HomeSection';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'employees':
        return <EmployeesSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-large">EP</div>
          <h2>Portal</h2>
        </div>

        <nav className="sidebar-nav">
          <button
            onClick={() => setActiveSection('home')}
            className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`}
          >
            <Home size={20} />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveSection('employees')}
            className={`nav-btn ${activeSection === 'employees' ? 'active' : ''}`}
          >
            <Users size={20} />
            <span>Employees</span>
          </button>

          <button
            onClick={() => setActiveSection('analytics')}
            className={`nav-btn ${activeSection === 'analytics' ? 'active' : ''}`}
          >
            <BarChart3 size={20} />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setActiveSection('settings')}
            className={`nav-btn ${activeSection === 'settings' ? 'active' : ''}`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.charAt(0)}</div>
            <div className="user-details">
              <p className="user-name">{user?.name}</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="logout-btn"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <h1 className="section-title">
            {activeSection === 'home' && 'Welcome to Dashboard'}
            {activeSection === 'employees' && 'Employee Management'}
            {activeSection === 'analytics' && 'Analytics & Reports'}
            {activeSection === 'settings' && 'Settings & Preferences'}
          </h1>

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
        </header>

        <div className="content-area">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
