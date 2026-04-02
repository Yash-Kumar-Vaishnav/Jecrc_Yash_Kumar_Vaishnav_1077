import './Products.css';

const reviewsList = [
  { name: "Aisha P.", rating: 5, date: "Mar 2025", text: "Absolutely stunning quality." },
  { name: "Marco R.", rating: 5, date: "Feb 2025", text: "Worth every penny. I've received so many compliments since purchasing." },
];

export function Reviews() {
  const avg = (reviewsList.reduce((a, r) => a + r.rating, 0) / reviewsList.length).toFixed(1);

  return (
    <div className="nested-page fade-in">
      <div className="reviews-summary">
        <div className="reviews-avg">
          <span className="avg-num">{avg}</span>
          <div>
            <div style={{ color: 'var(--gold)', fontSize: 18, letterSpacing: 2 }}>{'★'.repeat(5)}</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{reviewsList.length} verified reviews</p>
          </div>
        </div>
        <button className="btn btn-outline" style={{ fontSize: 13 }}>Write a Review</button>
      </div>

      <div className="reviews-list">
        {reviewsList.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-header">
              <div className="review-avatar">{r.name[0]}</div>
              <div>
                <p className="review-name">{r.name}</p>
                <p className="review-date">{r.date}</p>
              </div>
              <div className="review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
            </div>
            <p className="review-text">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Specs() {
  const specs = [
    { group: 'Materials', items: [
      ['Primary material', 'Grade-A Mongolian Cashmere / Swiss Movement'],
      ['Finish', 'Brushed & polished'],
      ['Hardware', '18k Gold / Antique Brass'],
    ]},
    { group: 'Dimensions', items: [
      ['Weight', '420g'],
      ['Dimensions', '32 × 28 × 8 cm'],
      ['Available sizes', 'XS, S, M, L, XL'],
    ]},
    { group: 'Care & Compliance', items: [
      ['Care instructions', 'Dry clean only'],
      ['Warranty', '2 years international'],
      ['Certification', 'ISO 9001 · CE Marked'],
    ]},
  ];

  return (
    <div className="nested-page fade-in">
      {specs.map(group => (
        <div key={group.group} className="specs-group">
          <h4 className="specs-group-title">{group.group}</h4>
          <table className="specs-table">
            <tbody>
              {group.items.map(([k, v]) => (
                <tr key={k}>
                  <td className="spec-key">{k}</td>
                  <td className="spec-val">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div className="specs-note">
        <span>ℹ️</span>
        <span>Specifications may vary slightly by variant. Contact us for precise measurements before ordering.</span>
      </div>
    </div>
  );
}
