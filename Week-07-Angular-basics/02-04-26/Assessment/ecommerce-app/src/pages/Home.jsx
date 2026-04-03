import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import './Home.css';

const featured = [
  { id: 1, name: 'Noir Timepiece', category: 'Watches', price: '$2,450', badge: 'New', img: '⌚' },
  { id: 2, name: 'Obsidian Pendant', category: 'Jewellery', price: '$890', badge: 'Sale', img: '💎' },
  { id: 3, name: 'Leather Briefcase', category: 'Accessories', price: '$620', badge: 'Popular', img: '🧳' },
  { id: 4, name: 'Cashmere Coat', category: 'Apparel', price: '$1,200', badge: 'New', img: '🧥' },
];

function Home() {
  const { t } = useLang();
  return (
    <div className="home fade-up">
      <section className="hero">
        <div className="hero-text">
          <span className="badge badge-gold">{t.home.badge}</span>
          <h1>{t.home.heroTitle}</h1>
          <p>{t.home.heroSub}</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">{t.home.shopBtn}</Link>
            <Link to="/about" className="btn btn-outline">{t.home.storyBtn}</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-icon">✦</div>
            <p className="hero-card-sub">{t.home.featuredSeason}</p>
            <p className="hero-card-title">{t.home.noirCollection}</p>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-head">
          <h2>{t.home.featuredProducts}</h2>
          <Link to="/products" className="see-all">{t.home.viewAll}</Link>
        </div>
        <div className="product-grid">
          {featured.map((p, i) => (
            <Link to={`/products/${p.id}`} key={p.id} className="product-card fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="product-thumb">{p.img}</div>
              <div className="product-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p className="product-category">{p.category}</p>
                    <p className="product-name">{p.name}</p>
                  </div>
                  <span className={`badge ${p.badge === 'Sale' ? 'badge-rust' : p.badge === 'Popular' ? 'badge-green' : 'badge-gold'}`}>{p.badge}</span>
                </div>
                <p className="product-price">{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="promo-banner">
        <div className="promo-content">
          <h2>{t.home.promoTitle}</h2>
          <p>{t.home.promoSub}</p>
          <Link to="/register" className="btn btn-gold">{t.home.joinBtn}</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
