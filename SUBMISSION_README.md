# Submission Package – E-commerce Technical Assessment

## Project Overview
This repository contains completed tasks for:
- Backend Developer Test
- Frontend Developer Test
- QA Engineer Test
- Designer Test
- Blockchain Developer Test
- AI Developer Test

## How to Run
1) Backend (JSON test mode)
```bash
export TEST_MODE=json
export PORT=4001
npm run server
# API: http://localhost:4001/api/v1/products
```

2) Frontend
```bash
npm run client
# App: http://localhost:3000
# AI Catalog: http://localhost:3000/ai
```

## Key Routes/Pages
- Homepage: /
- Products: /product
- AI Catalog (NLP search + recommendations): /ai
- Blockchain demo page (wallet connect): integrate via `src/pages/BlockchainDemo.jsx` (optional route)

## Deliverables Index
- Backend API docs: `BACKEND_TEST_SUMMARY.md`
- Postman: `Backend_Test_Collection.json`
- Frontend Product Card docs: `FRONTEND_TEST_SUMMARY.md`
- QA: `QA_TEST_SUMMARY.md`, `QA_TEST_CASES.csv`, `QA_BUG_REPORTS.md`
- Designer concept: `DESIGN_TEST_SUMMARY.md`
- Blockchain wallet integration: `BLOCKCHAIN_TEST_README.md`
- AI Catalog: `AI_TEST_README.md`
- Walkthrough script: `WALKTHROUGH_SCRIPT.md`

## Notes
- No DB required for test mode; products persist to `api/data/products.json`.
- Proxy for frontend dev is configured in `src/setupProxy.js`.
- Wallet integration uses MetaMask via `ethers`. 