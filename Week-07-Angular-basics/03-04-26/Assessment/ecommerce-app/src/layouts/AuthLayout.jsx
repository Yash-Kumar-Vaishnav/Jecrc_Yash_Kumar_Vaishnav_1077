import { Outlet, Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';
import './AuthLayout.css';

function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-brand">
        <div className="auth-brand-inner">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <Link to="/" className="auth-logo">
              <span className="auth-logo-mark">S</span>
              <span className="auth-logo-text">ShopElite</span>
            </Link>
          </div>
          <div className="auth-brand-copy">
            <h2>The world's finest<br />marketplace.</h2>
            <p>Curated luxury, delivered to your door. Join over 500,000 discerning shoppers worldwide.</p>
          </div>
          <div className="auth-brand-stats">
            <div className="stat"><span className="stat-num">500K+</span><span className="stat-label">Members</span></div>
            <div className="stat"><span className="stat-num">120+</span><span className="stat-label">Countries</span></div>
            <div className="stat"><span className="stat-num">4.9★</span><span className="stat-label">Rated</span></div>
          </div>
          <div className="auth-brand-decor" />
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-panel-top">
          <LanguageSwitcher />
        </div>
        <div className="auth-panel-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
