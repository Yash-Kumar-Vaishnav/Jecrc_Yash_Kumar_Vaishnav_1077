import './StaticPages.css';

export function About() {
  return (
    <div className="static-page fade-up">
      <div className="page-hero">
        <span className="badge badge-gold">Est. 2018</span>
        <h1>About ShopElite</h1>
        <p>We curate the world's finest goods so you don't have to.</p>
      </div>
      <div className="content-grid">
        <div className="card">
          <div className="icon-box">🌍</div>
          <h3>Global Reach</h3>
          <p>Operating in 120+ countries with local warehouse hubs for fast, reliable delivery to your doorstep.</p>
        </div>
        <div className="card">
          <div className="icon-box">✦</div>
          <h3>Curation First</h3>
          <p>Every product is vetted by our in-house experts. We list fewer items so each one earns your attention.</p>
        </div>
        <div className="card">
          <div className="icon-box">🔒</div>
          <h3>Trusted & Secure</h3>
          <p>Bank-grade encryption and buyer protection on every order. Shop with complete confidence.</p>
        </div>
      </div>
      <div className="card mission-card">
        <h2>Our Mission</h2>
        <p>ShopElite was founded on a simple belief: that luxury should be accessible, trustworthy, and joyful. We bridge the gap between artisans and the consumers who truly appreciate their craft — building lasting relationships built on quality, integrity, and an unwavering eye for the exceptional.</p>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="static-page fade-up">
      <div className="page-hero">
        <span className="badge badge-gold">We're Here</span>
        <h1>Contact Us</h1>
        <p>Our team responds within 2 business hours.</p>
      </div>
      <div className="contact-layout">
        <div className="contact-form card">
          <h3>Send a message</h3>
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" className="form-input" placeholder="Jane Doe" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" className="form-input" placeholder="jane@example.com" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea className="form-input" rows="5" placeholder="How can we help?" />
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
        </div>
        <div className="contact-info">
          {[
            { icon: '📧', label: 'Email', value: 'support@shopelite.com' },
            { icon: '📞', label: 'Phone', value: '+1 (800) 555-0199' },
            { icon: '⏰', label: 'Hours', value: 'Mon–Fri, 9am–6pm EST' },
            { icon: '📍', label: 'Address', value: '200 Park Ave, New York, NY 10166' },
          ].map(item => (
            <div key={item.label} className="card contact-card">
              <span className="contact-icon">{item.icon}</span>
              <div>
                <p className="contact-label">{item.label}</p>
                <p className="contact-value">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
