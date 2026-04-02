import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './DashPages.css';

function Settings() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, push: false, sms: true });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="dash-page fade-up">
      <div className="dash-page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account and preferences.</p>
        </div>
        {saved && <span className="badge badge-green" style={{ fontSize: 13, padding: '8px 16px' }}>✓ Saved successfully</span>}
      </div>

      <div className="settings-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="card">
            <h3 style={{ marginBottom: 20 }}>Profile Information</h3>
            <div className="settings-avatar-row">
              <div className="settings-avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
              <div>
                <p style={{ fontWeight: 500, textTransform: 'capitalize' }}>{user?.name}</p>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>{user?.email}</p>
              </div>
            </div>
            {[
              { label: 'Full Name', defaultValue: user?.name, type: 'text' },
              { label: 'Email Address', defaultValue: user?.email, type: 'email' },
              { label: 'Phone Number', defaultValue: '+1 (555) 000-0000', type: 'tel' },
            ].map(f => (
              <div key={f.label} className="form-group" style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} className="form-input" defaultValue={f.defaultValue} style={{ textTransform: f.label === 'Full Name' ? 'capitalize' : 'none' }} />
              </div>
            ))}
            <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={handleSave}>Save Changes</button>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 20 }}>Change Password</h3>
            {['Current Password', 'New Password', 'Confirm New Password'].map(l => (
              <div key={l} className="form-group" style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{l}</label>
                <input type="password" className="form-input" placeholder="••••••••" />
              </div>
            ))}
            <button className="btn btn-outline" onClick={handleSave}>Update Password</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="card">
            <h3 style={{ marginBottom: 20 }}>Notifications</h3>
            {Object.entries(notifications).map(([key, val]) => (
              <div key={key} className="toggle-row">
                <div>
                  <p style={{ fontWeight: 500, textTransform: 'capitalize' }}>{key === 'push' ? 'Push Notifications' : key === 'sms' ? 'SMS Alerts' : 'Email Notifications'}</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {key === 'email' ? 'Order updates and promotions' : key === 'push' ? 'Real-time browser alerts' : 'Shipping & delivery SMS'}
                  </p>
                </div>
                <button
                  className={`toggle-btn ${val ? 'active' : ''}`}
                  onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                />
              </div>
            ))}
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Danger Zone</h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16 }}>Permanently delete your account and all associated data. This action cannot be undone.</p>
            <button className="btn" style={{ background: '#fdf0ec', color: 'var(--rust)', border: '1.5px solid #f4c4b4' }}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
