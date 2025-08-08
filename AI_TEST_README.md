# AI Developer Test - Smart Catalog

## Overview
Built an AI-enhanced product catalog featuring:
- A static catalog of 10 sample products
- A mode toggle to experience three approaches:
  - Smart Product Search (NLP-lite)
  - Dynamic Pricing (rule-based)
  - Recommendation System (rule-based)
- A premium UI with hero, glass cards, and segmented toggle

## How to Run
```bash
# Terminal 1: Backend (already running for other tests, not required for AI catalog)
export TEST_MODE=json
export PORT=4001
npm run server

# Terminal 2: Frontend
npm run client
# Open http://localhost:3000/ai
```

## Feature Choices
- Primary: 🧠 Smart Product Search (NLP-lite)
- Also available via toggle: 💲 Dynamic Pricing, 👍 Recommendations

## How It Works
- NLP-like parser extracts:
  - Max price: "under $100", "below 80"
  - Rating hints: "good reviews" (>= 4.3), "4+", "above 4"
  - Categories from keywords: running, sneakers → Shoes; yoga, gym → Fitness; hoodie, socks → Apparel; earbuds, tracker → Electronics
- Dynamic Pricing engine adjusts prices with rule-based multiplier:
  - Demand (±15%), rating (±5%), category (+3% for Electronics/Shoes), peak hours (+3% / off-peak −1%)
- Recommendation engine scores by rating, preferred categories, and budget; top 5 are shown

## Files
- `src/pages/AICatalog.jsx`: Catalog UI, mode toggle, smart search, pricing, recommendations
- `src/pages/AICatalog.css`: Premium hero + glass styles

## Tools/Libraries
- React + Bootstrap (already in repo)
- No external AI services; custom lightweight logic

## Assumptions
- Natural language queries are limited to a few common patterns (price, category, rating)
- Pricing is illustrative (mocked demand/time); does not fetch real market data
- Recommendations are rule-based for speed and clarity

## Bonus: AI x Blockchain
- Token-gated dynamic pricing: apply discounts when a connected wallet holds a loyalty NFT or token
- On-chain preferences: store category preferences on-chain for portable, privacy-preserving personalization 