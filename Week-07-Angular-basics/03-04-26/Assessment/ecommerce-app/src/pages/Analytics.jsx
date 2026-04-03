import { useLang } from '../context/LanguageContext';
import './DashPages.css';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const revenues = [32000,41000,38000,52000,47000,61000,58000,72000,68000,84000,79000,91000];
const max = Math.max(...revenues);

const topProducts = [
  { name: 'Noir Timepiece',   sales: 234, revenue: '$573,300', pct: 88 },
  { name: 'Cashmere Coat',    sales: 198, revenue: '$237,600', pct: 74 },
  { name: 'Obsidian Pendant', sales: 312, revenue: '$278,680', pct: 95 },
  { name: 'Leather Briefcase',sales: 167, revenue: '$103,540', pct: 62 },
  { name: 'Silk Scarf',       sales: 289, revenue: '$98,260',  pct: 58 },
];

function Analytics() {
  const { t } = useLang();

  const metrics = [
    { label: t.analytics.conversionRate,  value: '3.8%',  sub: '+0.4% vs last month',   color: 'var(--sage)' },
    { label: t.analytics.avgOrderValue,   value: '$412',  sub: 'Up from $389',           color: 'var(--gold-dark)' },
    { label: t.analytics.cartAbandonment, value: '62%',   sub: 'Industry avg: 70%',      color: 'var(--rust)' },
    { label: t.analytics.repeatCustomers, value: '41%',   sub: 'Strong loyalty signal',  color: 'var(--ink)' },
  ];

  return (
    <div className="dash-page fade-up">
      <div className="dash-page-header">
        <div>
          <h1>{t.analytics.title}</h1>
          <p>{t.analytics.sub}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline" style={{ fontSize: 13 }}>{t.analytics.exportCsv}</button>
          <button className="btn btn-primary" style={{ fontSize: 13 }}>{t.analytics.fullReport}</button>
        </div>
      </div>

      <div className="card chart-card">
        <div className="card-head">
          <h3>{t.analytics.monthlyRevenue}</h3>
          <span className="badge badge-green">↑ 12.4% YoY</span>
        </div>
        <div className="bar-chart">
          {revenues.map((v, i) => (
            <div key={i} className="bar-col">
              <div className="bar" style={{ height: `${(v / max) * 180}px` }} title={`$${v.toLocaleString()}`} />
              <span className="bar-label">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dash-two-col">
        <div className="card">
          <div className="card-head">
            <h3>{t.analytics.topProducts}</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
            {topProducts.map(p => (
              <div key={p.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</span>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>{p.sales} {t.analytics.sold}</span>
                </div>
                <div className="progress-track">
                  <div className="progress-bar" style={{ width: `${p.pct}%` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>{p.pct}{t.analytics.ofTarget}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)' }}>{p.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {metrics.map(m => (
            <div key={m.label} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 4, height: 40, background: m.color, borderRadius: 2, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</p>
                <p style={{ fontSize: 24, fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>{m.value}</p>
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'right' }}>{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
