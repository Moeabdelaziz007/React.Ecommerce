import React, { useMemo, useState } from "react";
import { Navbar, Footer } from "../components";
import "./AICatalog.css";

const SAMPLE_PRODUCTS = [
  { id: "p1", name: "Running Shoes Pro", price: 89.99, category: "Shoes", rating: 4.5, description: "Lightweight running shoes for daily training" },
  { id: "p2", name: "Trail Runner XT", price: 119.0, category: "Shoes", rating: 4.7, description: "All-terrain trail running shoes with superior grip" },
  { id: "p3", name: "Yoga Mat Comfort", price: 29.99, category: "Fitness", rating: 4.2, description: "Extra thick non-slip yoga mat" },
  { id: "p4", name: "Dumbbell Set 20kg", price: 79.5, category: "Fitness", rating: 4.6, description: "Adjustable dumbbell set for home workouts" },
  { id: "p5", name: "Compression T-Shirt", price: 24.99, category: "Apparel", rating: 4.0, description: "Breathable compression tee for performance" },
  { id: "p6", name: "Hoodie Classic", price: 49.99, category: "Apparel", rating: 4.3, description: "Soft fleece hoodie for everyday wear" },
  { id: "p7", name: "Running Socks Pack", price: 14.99, category: "Apparel", rating: 4.4, description: "Moisture-wicking socks for long runs" },
  { id: "p8", name: "Fitness Tracker Band", price: 59.99, category: "Electronics", rating: 4.1, description: "Track steps, heart rate, and sleep" },
  { id: "p9", name: "Wireless Earbuds Sport", price: 79.99, category: "Electronics", rating: 4.6, description: "Sweat-resistant earbuds with secure fit" },
  { id: "p10", name: "Running Shoes Budget", price: 59.0, category: "Shoes", rating: 4.0, description: "Affordable runners with cushioned sole" }
];

// Simple NLP-like parser: extracts budget, category keywords, and rating hints
function parseQuery(query) {
  const q = query.toLowerCase();
  const result = { maxPrice: undefined, minRating: undefined, categories: [] };

  // Price: "under $100", "below 80"
  const priceUnder = q.match(/under\s*\$?\s*(\d+(?:\.\d+)?)/) || q.match(/below\s*\$?\s*(\d+(?:\.\d+)?)/);
  if (priceUnder) result.maxPrice = parseFloat(priceUnder[1]);

  // Rating: "good reviews", "4+", "above 4"
  if (q.includes("good reviews") || q.includes("highly rated")) result.minRating = 4.3;
  const ratingNum = q.match(/(\d(?:\.\d)?)\s*\+/) || q.match(/above\s*(\d(?:\.\d)?)/);
  if (ratingNum) result.minRating = Math.max(result.minRating || 0, parseFloat(ratingNum[1]));

  // Categories: basic mapping
  const catMap = {
    shoes: ["shoes", "running", "sneakers", "trail"],
    fitness: ["fitness", "gym", "workout", "yoga", "dumbbell"],
    apparel: ["apparel", "shirt", "t-shirt", "hoodie", "socks"],
    electronics: ["electronics", "earbuds", "tracker", "band", "wireless"]
  };
  Object.entries(catMap).forEach(([cat, tokens]) => {
    if (tokens.some(t => q.includes(t))) result.categories.push(capitalize(cat));
  });

  // Fallback: if mentions "running shoes" treat as Shoes
  if (q.includes("running shoes") && !result.categories.includes("Shoes")) result.categories.push("Shoes");

  return result;
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function smartFilter(products, query) {
  if (!query.trim()) return products;
  const intent = parseQuery(query);
  return products.filter(p => {
    if (intent.maxPrice !== undefined && p.price > intent.maxPrice) return false;
    if (intent.minRating !== undefined && p.rating < intent.minRating) return false;
    if (intent.categories.length && !intent.categories.includes(p.category)) return false;
    // basic keyword relevance
    const text = `${p.name} ${p.category} ${p.description}`.toLowerCase();
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const relevance = terms.reduce((acc, t) => acc + (text.includes(t) ? 1 : 0), 0);
    return relevance >= Math.max(1, Math.floor(terms.length / 4));
  });
}

function recommend(products, userPrefs) {
  // Simple rule-based recommender: match category, then sort by rating and price within budget
  const { favoriteCategories = [], budget } = userPrefs;
  const scored = products.map(p => {
    let score = p.rating * 2;
    if (favoriteCategories.includes(p.category)) score += 3;
    if (budget && p.price <= budget) score += 2;
    return { p, score };
  });
  return scored.sort((a, b) => b.score - a.score).slice(0, 5).map(s => s.p);
}

// Dynamic Pricing Engine (rule-based)
function dynamicPriceFor(product, context) {
  const { demand = 50, isPeakHours = false, now = new Date() } = context;
  let multiplier = 1.0;
  // Demand-driven +/- up to 15%
  multiplier += ((demand - 50) / 50) * 0.15; // demand 0 -> -15%, 100 -> +15%
  // Rating premium/discount
  if (product.rating >= 4.6) multiplier += 0.05;
  else if (product.rating < 4.0) multiplier -= 0.05;
  // Category premium
  if (product.category === 'Electronics' || product.category === 'Shoes') multiplier += 0.03;
  // Time-based micro-adjustment
  const hour = now.getHours();
  const peak = isPeakHours || (hour >= 17 && hour <= 22);
  if (peak) multiplier += 0.03; else multiplier -= 0.01;
  // Clamp
  multiplier = Math.max(0.75, Math.min(1.35, multiplier));
  const adjusted = Number((product.price * multiplier).toFixed(2));
  return { adjusted, multiplier };
}

function categoryIcon(cat) {
  switch (cat) {
    case 'Shoes': return '👟';
    case 'Fitness': return '💪';
    case 'Apparel': return '🧥';
    case 'Electronics': return '🎧';
    default: return '🛍️';
  }
}

export default function AICatalog() {
  const [aiMode, setAiMode] = useState('smart'); // 'smart' | 'pricing' | 'recs'
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [budget, setBudget] = useState(100);
  const [favorites, setFavorites] = useState(["Shoes", "Fitness"]);
  const [demand, setDemand] = useState(50);
  const [isPeakHours, setIsPeakHours] = useState(false);

  const categories = useMemo(() => Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.category))), []);

  const smartFiltered = useMemo(() => {
    let list = smartFilter(SAMPLE_PRODUCTS, query);
    if (category) list = list.filter(p => p.category === category);
    if (maxPrice) list = list.filter(p => p.price <= Number(maxPrice));
    return list;
  }, [query, category, maxPrice]);

  const pricingList = useMemo(() => {
    let list = SAMPLE_PRODUCTS;
    if (category) list = list.filter(p => p.category === category);
    if (maxPrice) list = list.filter(p => p.price <= Number(maxPrice));
    return list.map(p => ({
      ...p,
      pricing: dynamicPriceFor(p, { demand, isPeakHours })
    }));
  }, [category, maxPrice, demand, isPeakHours]);

  const recs = useMemo(() => recommend(SAMPLE_PRODUCTS, { favoriteCategories: favorites, budget }), [favorites, budget]);

  const renderCards = (list) => (
    <div className="row">
      {list.map(p => (
        <div className="col-md-6 mb-3" key={p.id}>
          <div className="card h-100 glass-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <h6 className="fw-bold mb-1">{p.name}</h6>
                {aiMode === 'pricing' && p.pricing ? (
                  <div className="text-end">
                    <span className="badge badge-adjusted me-2">Adjusted</span>
                    <div className="fw-bold">${p.pricing.adjusted.toFixed(2)}</div>
                    <div className="text-muted small"><s>${p.price.toFixed(2)}</s> • {(p.pricing.multiplier*100-100).toFixed(0)}%</div>
                  </div>
                ) : (
                  <span className="badge bg-dark">${p.price.toFixed(2)}</span>
                )}
              </div>
              <div className="text-muted small mb-2">{p.category} • ⭐ {p.rating}</div>
              <p className="mb-0 small text-muted">{p.description}</p>
            </div>
          </div>
        </div>
      ))}
      {list.length === 0 && (
        <div className="col-12 text-center text-muted py-5">No products match your criteria.</div>
      )}
    </div>
  );

  const listForMode = () => {
    if (aiMode === 'smart') return renderCards(smartFiltered);
    if (aiMode === 'pricing') return renderCards(pricingList);
    return renderCards(recs);
  };

  return (
    <>
      <Navbar />

      <section className="ai-hero">
        <div className="container text-center py-5">
          <span className="badge hero-badge mb-3"><i className="fas fa-magic me-2"></i>AI Catalog</span>
          <h1 className="hero-title mb-2">Discover Products Smarter</h1>
          <p className="hero-subtitle mb-0">Toggle between Smart Search, Dynamic Pricing, and Recommendations.</p>
        </div>
        <div className="hero-glow" />
      </section>

      <div className="container my-5">
        <div className="row mb-3 align-items-center">
          <div className="col-12 d-flex justify-content-center">
            <div className="toggle-segment bg-light p-1 rounded-pill shadow-sm">
              <button className={`btn btn-sm ${aiMode==='smart'?'btn-dark':'btn-outline-dark'}`} onClick={()=>setAiMode('smart')} title="بحث ذكي" aria-label="Smart Search">
                <i className="fas fa-language me-1"></i> Smart Search
              </button>
              <button className={`btn btn-sm ${aiMode==='pricing'?'btn-dark':'btn-outline-dark'}`} onClick={()=>setAiMode('pricing')} title="تسعير حسب العرض/الطلب" aria-label="Dynamic Pricing">
                <i className="fas fa-dollar-sign me-1"></i> Dynamic Pricing
              </button>
              <button className={`btn btn-sm ${aiMode==='recs'?'btn-dark':'btn-outline-dark'}`} onClick={()=>setAiMode('recs')} title="توصيات مخصصة" aria-label="Recommendations">
                <i className="fas fa-thumbs-up me-1"></i> Recs
              </button>
            </div>
          </div>
        </div>

        {/* Controls */}
        {aiMode === 'smart' && (
          <div className="row g-3 align-items-end mb-4">
            <div className="col-md-6">
              <label className="form-label">Smart Search (e.g., "running shoes under $100 with good reviews")</label>
              <input className="form-control" value={query} onChange={e => setQuery(e.target.value)} placeholder="Type a natural query..." />
            </div>
            <div className="col-md-3">
              <label className="form-label">Filter by Category</label>
              <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">All</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Max Price ($)</label>
              <input type="number" className="form-control" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="e.g., 100" />
            </div>
          </div>
        )}

        {aiMode === 'pricing' && (
          <div className="row g-3 align-items-end mb-4">
            <div className="col-md-4">
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">All</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Max Base Price ($)</label>
              <input type="number" className="form-control" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="e.g., 100" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Demand Level: {demand}%</label>
              <input type="range" min="0" max="100" value={demand} onChange={e => setDemand(Number(e.target.value))} className="form-range" />
              <div className="form-check form-switch mt-1">
                <input className="form-check-input" type="checkbox" id="peakSwitch" checked={isPeakHours} onChange={e => setIsPeakHours(e.target.checked)} />
                <label className="form-check-label" htmlFor="peakSwitch">Peak Hours</label>
              </div>
            </div>
          </div>
        )}

        {aiMode === 'recs' && (
          <div className="row g-3 align-items-end mb-4">
            <div className="col-md-6">
              <label className="form-label small">Favorite Categories</label>
              <div className="d-flex flex-wrap gap-2">
                {categories.map(c => (
                  <button
                    type="button"
                    key={c}
                    className={`btn btn-sm ${favorites.includes(c) ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setFavorites(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])}
                  >{c}</button>
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label small">Budget: ${budget}</label>
              <input type="range" min="20" max="150" value={budget} onChange={e => setBudget(Number(e.target.value))} className="form-range" />
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-lg-8">
            <h5 className="mb-3">{aiMode==='recs' ? 'Recommended for You' : 'Results'} ({aiMode==='smart' ? smartFiltered.length : aiMode==='pricing' ? pricingList.length : recs.length})</h5>
            {listForMode()}
          </div>

          <div className="col-lg-4">
            <div className="card glass-card mb-3">
              <div className="card-body">
                <h6 className="fw-bold">{aiMode==='pricing' ? 'Pricing Rules' : aiMode==='recs' ? 'Your Preferences' : 'Tip'}</h6>
                {aiMode === 'smart' && (
                  <div className="text-muted small">Try queries like: "wireless earbuds under $80", "shoes 4+ rating".</div>
                )}
                {aiMode === 'pricing' && (
                  <ul className="small text-muted mb-0">
                    <li>Demand shifts ±15%</li>
                    <li>Rating premium/discount ±5%</li>
                    <li>Category micro-adjustment +3% (Electronics/Shoes)</li>
                    <li>Peak hours +3% (off-peak -1%)</li>
                  </ul>
                )}
                {aiMode === 'recs' && (
                  <div className="text-muted small">Adjust favorites and budget to tailor recommendations.</div>
                )}
              </div>
            </div>

            {/* Sidebar tiles for recommendations */}
            {aiMode !== 'recs' && (
              <div className="card glass-card">
                <div className="card-body">
                  <h6 className="fw-bold mb-2">Recommended for You</h6>
                  <div className="row g-2">
                    {recs.map(p => (
                      <div className="col-6" key={p.id}>
                        <div className="recs-tile">
                          <div className="recs-icon">{categoryIcon(p.category)}</div>
                          <div className="recs-name" title={p.name}>{p.name}</div>
                          <div className="recs-meta">{p.category} • ⭐ {p.rating}</div>
                          <div className="recs-price">${p.price.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="alert alert-info glass-card mt-3">
              <div className="fw-bold mb-1">Bonus: AI x Blockchain</div>
              <div className="small mb-1">- Token-gated dynamic pricing: discounted prices for token holders.</div>
              <div className="small">- On-chain preferences: store category preferences in a smart contract for portable personalization.</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 