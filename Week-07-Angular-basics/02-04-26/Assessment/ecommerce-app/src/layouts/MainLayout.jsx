import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import './MainLayout.css';

function MainLayout() {
  const { isAuthenticated } = useAuth();
  const { t } = useLang();

  return (
    <div className="main-layout">
      <header className="main-header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <span className="logo-mark">S</span>
            <span className="logo-text">ShopElite</span>
          </Link>
          <nav className="main-nav">
            <NavLink to="/" end>{t.nav.home}</NavLink>
            <NavLink to="/about">{t.nav.about}</NavLink>
            <NavLink to="/contact">{t.nav.contact}</NavLink>
            <NavLink to="/products">{t.nav.products}</NavLink>
          </nav>
          <div className="header-actions">
            <LanguageSwitcher />
            {isAuthenticated
              ? <Link to="/dashboard" className="btn btn-primary">{t.nav.dashboard}</Link>
              : <Link to="/login" className="btn btn-primary">{t.nav.signIn}</Link>
            }
          </div>
        </div>
      </header>

      <div className="main-body">
        <aside className="main-sidebar">
          <div className="sidebar-section">
            <p className="sidebar-label">{t.sidebar.navigate}</p>
            <NavLink to="/" end className="sidebar-link">🏠 {t.nav.home}</NavLink>
            <NavLink to="/about" className="sidebar-link">ℹ️ {t.nav.about}</NavLink>
            <NavLink to="/contact" className="sidebar-link">✉️ {t.nav.contact}</NavLink>
          </div>
          <div className="sidebar-section">
            <p className="sidebar-label">{t.sidebar.catalogue}</p>
            <NavLink to="/products" className="sidebar-link">🛍️ {t.sidebar.allProducts}</NavLink>
            <NavLink to="/products/1" className="sidebar-link">📦 {t.sidebar.featuredItem}</NavLink>
          </div>
          <div className="sidebar-promo">
            <p className="promo-title">{t.sidebar.promoTitle}</p>
            <p className="promo-sub">{t.sidebar.promoSub}</p>
          </div>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <footer className="main-footer">
        <div className="footer-inner">
          <span className="serif" style={{ fontSize: 18, fontWeight: 600 }}>ShopElite</span>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>{t.footer.rights}</span>
          <div className="footer-links">
            <a href="#privacy">{t.footer.privacy}</a>
            <a href="#terms">{t.footer.terms}</a>
            <a href="#support">{t.footer.support}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
