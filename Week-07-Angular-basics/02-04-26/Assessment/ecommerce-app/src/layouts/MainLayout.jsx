import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MainLayout.css';

function MainLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="main-layout">
      <header className="main-header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <span className="logo-mark">S</span>
            <span className="logo-text">ShopElite</span>
          </Link>
          <nav className="main-nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/products">Products</NavLink>
          </nav>
          <div className="header-actions">
            {isAuthenticated
              ? <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
              : <Link to="/login" className="btn btn-primary">Sign In</Link>
            }
          </div>
        </div>
      </header>

      <div className="main-body">
        <aside className="main-sidebar">
          <div className="sidebar-section">
            <p className="sidebar-label">Navigate</p>
            <NavLink to="/" end className="sidebar-link">🏠 Home</NavLink>
            <NavLink to="/about" className="sidebar-link">ℹ️ About</NavLink>
            <NavLink to="/contact" className="sidebar-link">✉️ Contact</NavLink>
          </div>
          <div className="sidebar-section">
            <p className="sidebar-label">Catalogue</p>
            <NavLink to="/products" className="sidebar-link">🛍️ All Products</NavLink>
            <NavLink to="/products/1" className="sidebar-link">📦 Featured Item</NavLink>
          </div>
          <div className="sidebar-promo">
            <p className="promo-title">New Season</p>
            <p className="promo-sub">Luxury goods, curated for you.</p>
          </div>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <footer className="main-footer">
        <div className="footer-inner">
          <span className="serif" style={{ fontSize: 18, fontWeight: 600 }}>ShopElite</span>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>© 2025 — All rights reserved</span>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#support">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
