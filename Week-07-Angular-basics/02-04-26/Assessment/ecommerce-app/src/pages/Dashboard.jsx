import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import './DashPages.css';

const stats = [
  { key: 'totalRevenue', value: '$84,320', change: '+12.4%', up: true, icon: '💰' },
  { key: 'orders',       value: '1,284',   change: '+8.1%',  up: true, icon: '📦' },
  { key: 'customers',    value: '9,741',   change: '+5.3%',  up: true, icon: '👥' },
  { key: 'returns',      value: '42',      change: '-2.7%',  up: false, icon: '↩️' },
];

const recentOrders = [
  { id: '#ORD-8821', customer: 'Aisha Patel',    product: 'Noir Timepiece',   amount: '$2,450', status: 'Delivered' },
  { id: '#ORD-8820', customer: 'Marco Rossi',    product: 'Cashmere Coat',    amount: '$1,200', status: 'Shipped' },
  { id: '#ORD-8819', customer: 'Sophie Durand',  product: 'Obsidian Pendant', amount: '$890',   status: 'Processing' },
  { id: '#ORD-8818', customer: 'Kenji Tanaka',   product: 'Leather Briefcase',amount: '$620',   status: 'Delivered' },
  { id: '#ORD-8817', customer: 'Priya Nair',     product: 'Silk Scarf',       amount: '$340',   status: 'Shipped' },
];

const statusClass = { Delivered: 'badge-green', Shipped: 'badge-gold', Processing: 'badge-rust' };

function Dashboard() {
  const { user } = useAuth();
  const { t } = useLang();

  return (
    <div className="dash-page fade-up">
      <div className="dash-page-header">
        <div>
          <h1>{t.dashboard.greeting} <span className="serif" style={{ color: 'var(--gold-dark)', textTransform: 'capitalize' }}>{user?.name}</span> ✦</h1>
          <p>{t.dashboard.greetingSub}</p>
        </div>
        <Link to="/products" className="btn btn-primary">{t.dashboard.addProduct}</Link>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={s.key} className="card stat-card fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="stat-top">
              <span className="stat-icon">{s.icon}</span>
              <span className={`stat-change ${s.up ? 'up' : 'down'}`}>{s.change}</span>
            </div>
            <p className="stat-value">{s.value}</p>
            <p className="stat-label">{t.dashboard[s.key]}</p>
          </div>
        ))}
      </div>

      <div className="dash-two-col">
        <div className="card orders-card">
          <div className="card-head">
            <h3>{t.dashboard.recentOrders}</h3>
            <span className="badge badge-gold">{recentOrders.length} {t.dashboard.orders}</span>
          </div>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(o => (
                <tr key={o.id}>
                  <td className="order-id">{o.id}</td>
                  <td>{o.customer}</td>
                  <td style={{ color: 'var(--muted)' }}>{o.product}</td>
                  <td style={{ fontWeight: 600 }}>{o.amount}</td>
                  <td><span className={`badge ${statusClass[o.status]}`}>{t.dashboard.status[o.status]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card quick-links-card">
          <h3>{t.dashboard.quickActions}</h3>
          <div className="quick-links">
            {[
              { to: '/dashboard/analytics', icon: '📊', label: t.dashboard.viewAnalytics, sub: t.dashboard.chartsLabel },
              { to: '/dashboard/settings',  icon: '⚙️', label: t.dashboard.settings,     sub: t.dashboard.settingsLabel },
              { to: '/products',            icon: '🛍️', label: t.dashboard.browseProducts,sub: t.dashboard.catalogueLabel },
            ].map(q => (
              <Link key={q.to} to={q.to} className="quick-link">
                <span className="quick-icon">{q.icon}</span>
                <div><p className="quick-label">{q.label}</p><p className="quick-sub">{q.sub}</p></div>
                <span className="quick-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
