import { Outlet, NavLink, useParams, Link } from 'react-router-dom';
import './Products.css';

const productData = {
  1: { name: 'Noir Timepiece', category: 'Watches', price: '$2,450', rating: 4.9, reviews: 128, badge: 'New', icon: '⌚', desc: 'Swiss-movement automatic watch with sapphire crystal and alligator leather strap. Water resistant to 100m.' },
  2: { name: 'Obsidian Pendant', category: 'Jewellery', price: '$890', rating: 4.8, reviews: 94, badge: 'Sale', icon: '💎', desc: 'Hand-cut Mexican obsidian set in a brushed 18k white gold bezel. Includes 60cm Figaro chain.' },
  3: { name: 'Leather Briefcase', category: 'Accessories', price: '$620', rating: 4.7, reviews: 201, badge: 'Popular', icon: '🧳', desc: 'Full-grain Italian leather briefcase with antique brass fittings. Fits 15" laptop. Handmade in Florence.' },
  4: { name: 'Cashmere Coat', category: 'Apparel', price: '$1,200', rating: 4.9, reviews: 77, badge: 'New', icon: '🧥', desc: 'Double-faced Grade-A Mongolian cashmere overcoat. Tailored in Milan, available in three colourways.' },
};

function ProductDetail() {
  const { productId } = useParams();
  const p = productData[productId] || {
    name: `Product #${productId}`, category: 'Uncategorised', price: '—',
    rating: 5, reviews: 0, badge: null, icon: '📦',
    desc: 'Product details coming soon.'
  };

  return (
    <div className="product-detail fade-up">
      <div className="detail-breadcrumb">
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{p.name}</span>
      </div>

      <div className="detail-hero">
        <div className="detail-thumb">
          <span className="detail-icon">{p.icon}</span>
          {p.badge && <span className={`badge ${p.badge === 'Sale' ? 'badge-rust' : p.badge === 'Popular' ? 'badge-green' : 'badge-gold'} detail-badge`}>{p.badge}</span>}
        </div>
        <div className="detail-info">
          <p className="detail-cat">{p.category}</p>
          <h1 className="detail-name">{p.name}</h1>
          <div className="detail-rating">
            {'★★★★★'.split('').map((s, i) => (
              <span key={i} style={{ color: i < Math.floor(p.rating) ? '#c8a96e' : '#ddd' }}>★</span>
            ))}
            <span className="detail-rating-num">{p.rating}</span>
            <span className="detail-rating-count">({p.reviews} reviews)</span>
          </div>
          <p className="detail-desc">{p.desc}</p>
          <p className="detail-price">{p.price}</p>
          <div className="detail-actions">
            <button className="btn btn-primary" style={{ flex: 1 }}>Add to Cart</button>
            <button className="btn btn-outline">♡ Wishlist</button>
          </div>
          <div className="detail-meta">
            <span>🚚 Free shipping over $200</span>
            <span>↩️ 30-day returns</span>
            <span>✓ Authenticity guaranteed</span>
          </div>
        </div>
      </div>

      {/* Nested route tabs */}
      <div className="detail-tabs-wrap">
        <nav className="detail-tabs">
          <NavLink to="reviews" className="detail-tab">Customer Reviews</NavLink>
          <NavLink to="specs" className="detail-tab">Specifications</NavLink>
        </nav>
        <div className="detail-tab-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
