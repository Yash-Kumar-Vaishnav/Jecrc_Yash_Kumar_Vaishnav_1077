import { Link } from 'react-router-dom';
import './Products.css';

const products = [
  { id: 1, name: 'Noir Timepiece', category: 'Watches', price: '$2,450', rating: 4.9, reviews: 128, badge: 'New', icon: '⌚', desc: 'Swiss-movement automatic watch with sapphire crystal.' },
  { id: 2, name: 'Obsidian Pendant', category: 'Jewellery', price: '$890', rating: 4.8, reviews: 94, badge: 'Sale', icon: '💎', desc: 'Hand-cut obsidian set in 18k white gold.' },
  { id: 3, name: 'Leather Briefcase', category: 'Accessories', price: '$620', rating: 4.7, reviews: 201, badge: 'Popular', icon: '🧳', desc: 'Full-grain leather with brass fittings.' },
  { id: 4, name: 'Cashmere Coat', category: 'Apparel', price: '$1,200', rating: 4.9, reviews: 77, badge: 'New', icon: '🧥', desc: 'Pure Grade-A cashmere, tailored in Milan.' },
  { id: 5, name: 'Silk Scarf', category: 'Accessories', price: '$340', rating: 4.6, reviews: 156, badge: null, icon: '🧣', desc: 'Hand-printed silk from Lyonnais looms.' },
  { id: 6, name: 'Amber Decanter', category: 'Home', price: '$580', rating: 4.8, reviews: 63, badge: 'Popular', icon: '🏺', desc: 'Hand-blown amber glass with silver stopper.' },
  { id: 7, name: 'Cedar Cologne', category: 'Beauty', price: '$220', rating: 4.7, reviews: 312, badge: null, icon: '🌿', desc: 'Aged cedar and bergamot, 100ml.' },
  { id: 8, name: 'Walnut Chess Set', category: 'Leisure', price: '$760', rating: 5.0, reviews: 41, badge: 'New', icon: '♟️', desc: 'Hand-carved walnut and maple, weighted pieces.' },
];

const badgeClass = { New: 'badge-gold', Sale: 'badge-rust', Popular: 'badge-green' };

function ProductList() {
  return (
    <div className="products-page fade-up">
      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p>{products.length} curated items in our collection</p>
        </div>
        <div className="products-filters">
          <select className="filter-select">
            <option>All Categories</option>
            <option>Watches</option>
            <option>Jewellery</option>
            <option>Accessories</option>
            <option>Apparel</option>
          </select>
          <select className="filter-select">
            <option>Sort: Featured</option>
            <option>Price: Low → High</option>
            <option>Price: High → Low</option>
            <option>Best Rated</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {products.map((p, i) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="prod-card fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="prod-thumb">
              <span className="prod-icon">{p.icon}</span>
              {p.badge && <span className={`badge ${badgeClass[p.badge]} prod-badge`}>{p.badge}</span>}
            </div>
            <div className="prod-body">
              <p className="prod-cat">{p.category}</p>
              <p className="prod-name">{p.name}</p>
              <p className="prod-desc">{p.desc}</p>
              <div className="prod-footer">
                <span className="prod-price">{p.price}</span>
                <span className="prod-rating">★ {p.rating} <span className="prod-reviews">({p.reviews})</span></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
