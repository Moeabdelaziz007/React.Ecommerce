# 2–3 Minute Walkthrough Script

1) Intro (10s)
- "Hi, this is a quick walkthrough of my ecommerce assessment. I'll show the backend API, frontend product card, blockchain wallet connection, QA materials, design concept, and the AI catalog."

2) Run and verify (20s)
- Terminal: `export TEST_MODE=json && PORT=4001 npm run server`
- Confirm: open `http://localhost:4001/api/v1/products`
- Terminal: `npm run client`, open `http://localhost:3000`

3) Backend API (20s)
- Show GET `/api/v1/products`, `/api/v1/products/:id`, and category filter.
- Mention `Backend_Test_Collection.json` Postman collection and `BACKEND_TEST_SUMMARY.md`.

4) Frontend Product Card (20s)
- Navigate to homepage/products; highlight responsive ProductCard with variants, pricing, out-of-stock state, and quick add.
- Mention `FRONTEND_TEST_SUMMARY.md`.

5) Blockchain demo (20s)
- Briefly show `WalletConnect` component (MetaMask connect, network switching, test transaction UI states).
- Mention `BLOCKCHAIN_TEST_README.md`.

6) QA deliverables (15s)
- Open `QA_TEST_SUMMARY.md`, `QA_TEST_CASES.csv`, `QA_BUG_REPORTS.md`; summarize 15 cases and 6 bugs.

7) Designer concept (20s)
- Summarize homepage, PLP, PDP, cart/checkout concept and design system from `DESIGN_TEST_SUMMARY.md`.

8) AI Catalog (25s)
- Go to `http://localhost:3000/ai`; demonstrate query like "running shoes under $100 with good reviews".
- Show recommendation panel adjusting via category chips and budget slider.
- Mention `AI_TEST_README.md`.

9) Close (10s)
- "That wraps the demo; all deliverables are documented in the repository. Thank you!" 