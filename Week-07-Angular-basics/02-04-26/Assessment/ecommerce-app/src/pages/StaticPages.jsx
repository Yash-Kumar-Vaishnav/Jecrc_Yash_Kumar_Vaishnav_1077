import { useLang } from '../context/LanguageContext';
import './StaticPages.css';

export function About() {
  const { t } = useLang();
  return (
    <div className="static-page fade-up">
      <div className="page-hero">
        <span className="badge badge-gold">{t.about.badge}</span>
        <h1>{t.about.title}</h1>
        <p>{t.about.sub}</p>
      </div>
      <div className="content-grid">
        <div className="card"><div className="icon-box">🌍</div><h3>{t.about.globalTitle}</h3><p>{t.about.globalText}</p></div>
        <div className="card"><div className="icon-box">✦</div><h3>{t.about.curationTitle}</h3><p>{t.about.curationText}</p></div>
        <div className="card"><div className="icon-box">🔒</div><h3>{t.about.trustTitle}</h3><p>{t.about.trustText}</p></div>
      </div>
      <div className="card mission-card">
        <h2>{t.about.missionTitle}</h2>
        <p>{t.about.missionText}</p>
      </div>
    </div>
  );
}

export function Contact() {
  const { t } = useLang();
  return (
    <div className="static-page fade-up">
      <div className="page-hero">
        <span className="badge badge-gold">{t.contact.badge}</span>
        <h1>{t.contact.title}</h1>
        <p>{t.contact.sub}</p>
      </div>
      <div className="contact-layout">
        <div className="contact-form card">
          <h3>{t.contact.title}</h3>
          <div className="form-group"><label>{t.contact.nameLabel}</label><input type="text" className="form-input" placeholder="Jane Doe" /></div>
          <div className="form-group"><label>{t.contact.emailLabel}</label><input type="email" className="form-input" placeholder="jane@example.com" /></div>
          <div className="form-group"><label>{t.contact.messageLabel}</label><textarea className="form-input" rows="5" placeholder={t.contact.messagePlaceholder} /></div>
          <button className="btn btn-primary" style={{ width: '100%' }}>{t.contact.sendBtn}</button>
        </div>
        <div className="contact-info">
          {[
            { icon: '📧', label: t.contact.emailContact, value: 'support@shopelite.com' },
            { icon: '📞', label: t.contact.phone, value: '+1 (800) 555-0199' },
            { icon: '⏰', label: t.contact.hours, value: t.contact.hoursValue },
            { icon: '📍', label: t.contact.address, value: '200 Park Ave, New York, NY' },
          ].map(item => (
            <div key={item.label} className="card contact-card">
              <span className="contact-icon">{item.icon}</span>
              <div><p className="contact-label">{item.label}</p><p className="contact-value">{item.value}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
