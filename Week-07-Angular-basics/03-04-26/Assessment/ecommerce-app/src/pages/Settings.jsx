import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import './DashPages.css';

function Settings() {
  const { user } = useAuth();
  const { t, lang, setLang, LANGUAGES } = useLang();
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
          <h1>{t.settings.title}</h1>
          <p>{t.settings.sub}</p>
        </div>
        {saved && <span className="badge badge-green" style={{ fontSize: 13, padding: '8px 16px' }}>{t.settings.savedMsg}</span>}
      </div>

      <div className="settings-layout">
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Profile */}
          <div className="card">
            <h3 style={{ marginBottom: 20 }}>{t.settings.profileTitle}</h3>
            <div className="settings-avatar-row">
              <div className="settings-avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
              <div>
                <p style={{ fontWeight: 500, textTransform: 'capitalize' }}>{user?.name}</p>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>{user?.email}</p>
              </div>
            </div>
            {[
              { label: t.settings.nameField,  defaultValue: user?.name,              type: 'text'  },
              { label: t.settings.emailField, defaultValue: user?.email,             type: 'email' },
              { label: t.settings.phoneField, defaultValue: '+1 (555) 000-0000',     type: 'tel'   },
            ].map(f => (
              <div key={f.label} className="form-group" style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} className="form-input" defaultValue={f.defaultValue} />
              </div>
            ))}
            <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={handleSave}>{t.settings.saveBtn}</button>
          </div>

          {/* Password */}
          <div className="card">
            <h3 style={{ marginBottom: 20 }}>{t.settings.passwordTitle}</h3>
            {[t.settings.currentPwd, t.settings.newPwd, t.settings.confirmPwd].map(l => (
              <div key={l} className="form-group" style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{l}</label>
                <input type="password" className="form-input" placeholder="••••••••" />
              </div>
            ))}
            <button className="btn btn-outline" onClick={handleSave}>{t.settings.updatePwd}</button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* ── LANGUAGE & REGION — NEW SECTION ── */}
          <div className="card">
            <h3 style={{ marginBottom: 6 }}>{t.settings.languageTitle}</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>{t.settings.languageSub}</p>
            <div className="lang-grid">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`lang-tile ${lang === l.code ? 'active' : ''}`}
                >
                  <span className="lang-tile-flag">{l.flag}</span>
                  <span className="lang-tile-name">{l.label}</span>
                  {l.dir === 'rtl' && <span className="lang-tile-rtl">RTL</span>}
                  {lang === l.code && <span className="lang-tile-check">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <h3 style={{ marginBottom: 20 }}>{t.settings.notificationsTitle}</h3>
            {[
              { key: 'email', label: t.settings.emailNotif, sub: t.settings.emailNotifSub },
              { key: 'push',  label: t.settings.pushNotif,  sub: t.settings.pushNotifSub  },
              { key: 'sms',   label: t.settings.smsNotif,   sub: t.settings.smsNotifSub   },
            ].map(({ key, label, sub }) => (
              <div key={key} className="toggle-row">
                <div>
                  <p style={{ fontWeight: 500 }}>{label}</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)' }}>{sub}</p>
                </div>
                <button
                  className={`toggle-btn ${notifications[key] ? 'active' : ''}`}
                  onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                />
              </div>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t.settings.dangerTitle}</h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16 }}>{t.settings.dangerText}</p>
            <button className="btn" style={{ background: '#fdf0ec', color: 'var(--rust)', border: '1.5px solid #f4c4b4' }}>
              {t.settings.deleteBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
