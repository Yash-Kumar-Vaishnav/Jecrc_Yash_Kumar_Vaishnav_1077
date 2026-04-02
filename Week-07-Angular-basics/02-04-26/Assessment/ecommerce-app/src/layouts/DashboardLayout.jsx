import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DashboardLayout.css';

function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <Link to="/" className="dash-logo">
            <span className="dash-logo-mark">S</span>
            <span>ShopElite</span>
          </Link>
          <span className="badge badge-gold">Admin</span>
        </div>

        <nav className="dash-nav">
          <p className="dash-nav-label">Main</p>
          <NavLink to="/dashboard" end className="dash-nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/analytics" className="dash-nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Analytics
          </NavLink>
          <NavLink to="/dashboard/settings" className="dash-nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
            Settings
          </NavLink>

          <p className="dash-nav-label" style={{ marginTop: 24 }}>Shop</p>
          <NavLink to="/products" className="dash-nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            Products
          </NavLink>
        </nav>

        <div className="dash-user">
          <div className="dash-avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
          <div className="dash-user-info">
            <p className="dash-user-name">{user?.name}</p>
            <p className="dash-user-email">{user?.email}</p>
          </div>
          <button onClick={logout} className="dash-logout" title="Sign out">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-header">
          <div className="dash-header-inner">
            <div className="dash-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Dashboard</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-outline" style={{ fontSize: 13, padding: '7px 16px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
                Alerts
              </button>
            </div>
          </div>
        </header>

        <main className="dash-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
