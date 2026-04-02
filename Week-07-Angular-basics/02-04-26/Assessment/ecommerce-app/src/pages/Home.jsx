import { Link } from 'react-router-dom';
import './Home.css';

const featured = [
  { id: 1, name: 'Noir Timepiece', category: 'Watches', price: '$2,450', badge: 'New', img: '⌚' },
  { id: 2, name: 'Obsidian Pendant', category: 'Jewellery', price: '$890', badge: 'Sale', img: '💎' },
  { id: 3, name: 'Leather Briefcase', category: 'Accessories', price: '$620', badge: 'Popular', img: '🧳' },
  { id: 4, name: 'Cashmere Coat', category: 'Apparel', price: '$1,200', badge: 'New', img: '🧥' },
];

function Home() {
  return (
    <div className="home fade-up">
      <section className="hero">
        <div className="hero-text">
          <span className="badge badge-gold">New Season 2025</span>
          <h1>Luxury, <em>redefined</em> for the modern era.</h1>
          <p>Discover handpicked collections from the world's finest artisans and design houses.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">Shop Collection</Link>
            <Link to="/about" className="btn btn-outline">Our Story</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-icon">✦</div>
            <p className="hero-card-sub">Featured this season</p>
            <p className="hero-card-title">Noir Collection</p>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-head">
          <h2>Featured Products</h2>
          <Link to="/products" className="see-all">View all →</Link>
        </div>
        <div className="product-grid">
          {featured.map((p, i) => (
            <Link
              to={`/products/${p.id}`}
              key={p.id}
              className="product-card fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
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
          <h2>Members get 20% off every order</h2>
          <p>Join ShopElite today and unlock exclusive pricing, early access, and free global shipping.</p>
          <Link to="/register" className="btn btn-gold">Join Now — It's Free</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
