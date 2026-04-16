import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Settings, Moon, Sun, Bell, Lock, Database } from 'lucide-react';
import '../styles/SettingsSection.css';

const SettingsSection = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    dataCollection: false,
    autoLogout: true,
    sessionTimeout: 30
  });

  const handleSettingChange = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));

    // In a real app, you would save this to localStorage or a backend
    localStorage.setItem('appSettings', JSON.stringify({
      ...settings,
      [key]: !settings[key]
    }));
  };

  const handleTimeoutChange = (value) => {
    setSettings(prev => ({
      ...prev,
      sessionTimeout: parseInt(value)
    }));
    localStorage.setItem('appSettings', JSON.stringify({
      ...settings,
      sessionTimeout: parseInt(value)
    }));
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="settings-section">
      <div className="settings-container">
        {/* Theme Settings */}
        <div className="settings-card">
          <div className="card-header">
            <h3>
              <Sun size={20} />
              Appearance
            </h3>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-label">Dark Mode</p>
              <p className="setting-description">Switch between light and dark theme</p>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="dark-mode"
                checked={isDarkMode}
                onChange={toggleTheme}
                className="toggle-input"
              />
              <label htmlFor="dark-mode" className="toggle-label">
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-card">
          <div className="card-header">
            <h3>
              <Bell size={20} />
              Notifications
            </h3>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-label">Enable Notifications</p>
              <p className="setting-description">Receive in-app notifications</p>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="notifications"
                checked={settings.notifications}
                onChange={() => handleSettingChange('notifications')}
                className="toggle-input"
              />
              <label htmlFor="notifications" className="toggle-label"></label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-label">Email Alerts</p>
              <p className="setting-description">Get important updates via email</p>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="email-alerts"
                checked={settings.emailAlerts}
                onChange={() => handleSettingChange('emailAlerts')}
                className="toggle-input"
              />
              <label htmlFor="email-alerts" className="toggle-label"></label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-card">
          <div className="card-header">
            <h3>
              <Lock size={20} />
              Security
            </h3>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-label">Auto Logout</p>
              <p className="setting-description">Automatically logout after inactivity</p>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="auto-logout"
                checked={settings.autoLogout}
                onChange={() => handleSettingChange('autoLogout')}
                className="toggle-input"
              />
              <label htmlFor="auto-logout" className="toggle-label"></label>
            </div>
          </div>

          {settings.autoLogout && (
            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">Session Timeout (minutes)</p>
                <p className="setting-description">Time before automatic logout</p>
              </div>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => handleTimeoutChange(e.target.value)}
                className="timeout-select"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          )}
        </div>

        {/* Privacy Settings */}
        <div className="settings-card">
          <div className="card-header">
            <h3>
              <Database size={20} />
              Privacy
            </h3>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-label">Data Collection</p>
              <p className="setting-description">Allow usage analytics collection</p>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="data-collection"
                checked={settings.dataCollection}
                onChange={() => handleSettingChange('dataCollection')}
                className="toggle-input"
              />
              <label htmlFor="data-collection" className="toggle-label"></label>
            </div>
          </div>

          <div className="privacy-notice">
            <p>Your data is encrypted and secure. We never share your information with third parties.</p>
          </div>
        </div>

        {/* Account Information */}
        <div className="settings-card">
          <div className="card-header">
            <h3>
              <Settings size={20} />
              Account Information
            </h3>
          </div>

          <div className="account-info">
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{user?.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">User ID:</span>
              <span className="info-value">{user?.id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Role:</span>
              <span className="info-value">{user?.role}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Login Time:</span>
              <span className="info-value">{user?.loginTime?.toLocaleTimeString()}</span>
            </div>
          </div>

          <button onClick={handleLogout} className="logout-settings-btn">
            Logout
          </button>
        </div>

        {/* About Section */}
        <div className="settings-card about">
          <h3>About</h3>
          <div className="about-content">
            <p><strong>Employee Portal v1.0</strong></p>
            <p>An advanced React application using Context API for global state management.</p>
            <div className="version-info">
              <p>Built with React 18 & Vite</p>
              <p>© 2024 Capgemini. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
