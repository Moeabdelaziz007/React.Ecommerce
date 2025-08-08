# QA Report - Ecommerce Application

## Test Summary
This QA cycle focused on validating the core ecommerce flows and demos: product browsing, product details, variant handling, add to cart, cart management (quantity/remove/persistence), basic checkout validation, responsive behavior, and error handling (e.g., offline states). Additional verification covered the AI Catalog (smart search, pricing, recommendations) and the Blockchain demo (wallet connect/network change/transaction states). Testing was conducted manually on Chrome, with spot checks on Safari and Firefox.

## Test Coverage
- Product browsing and grid rendering
- Product details and variant selection persistence
- Add to Cart: in-stock, out-of-stock, multiple variants
- Cart updates: quantity increase/decrease, remove item, persistence via localStorage
- Checkout page presence and basic validation
- Responsive behavior (mobile/tablet/desktop)
- Error states (offline product load, offline add-to-cart)
- AI Catalog modes: Smart, Pricing, Recommendations
- Blockchain demo: connect/disconnect, network switch, transaction lifecycle

## Key Manual Test Cases (required format)
- Test Case ID: TC-CART-001
  - Description: Add in-stock product to cart
  - Steps to Reproduce: 1) Open `/product` 2) Click Add to Cart on an in-stock item 3) Open `/cart`
  - Expected Result: Toast success; cart badge increments; item visible in cart

- Test Case ID: TC-CART-003
  - Description: Add multiple variants of the same product
  - Steps to Reproduce: 1) Select variant S and add 2) Select variant M and add 3) Open `/cart`
  - Expected Result: Two distinct entries with variant labels (S and M)

- Test Case ID: TC-CART-006
  - Description: Remove item from cart
  - Steps to Reproduce: 1) Open `/cart` 2) Click remove (trash) icon
  - Expected Result: Item is removed; totals and badge update

- Test Case ID: TC-RESP-001
  - Description: Responsive grid (mobile)
  - Steps to Reproduce: 1) Devtools iPhone width 375px 2) Open `/product`
  - Expected Result: Grid stacks to 1–2 columns; readable text/buttons; no horizontal scroll

- Test Case ID: TC-ERR-001
  - Description: Offline product load handling
  - Steps to Reproduce: 1) Go offline 2) Open `/product`
  - Expected Result: Graceful message or fallback; no crash

Full set: see `QA_FULL_TEST_CASES.csv`.

## Bug Reports (required format)
- Bug Title: Variant Information Missing in Cart
  - Steps to Reproduce: Add product with variant (e.g., M), open cart
  - Actual vs Expected Result: Variant not shown vs should display (e.g., Size: M)
  - Severity: Medium

- Bug Title: Stock Validation Missing on Quantity Increase in Cart
  - Steps to Reproduce: Add in-stock item; increment qty repeatedly on `/cart`
  - Actual vs Expected Result: No cap vs should block at available stock with message
  - Severity: High

- Bug Title: Debounce/Double-Click Handling on Add to Cart
  - Steps to Reproduce: Rapidly click Add to Cart 5+ times
  - Actual vs Expected Result: Duplicate entries/excess qty vs single entry with proper qty; temporary disable during processing
  - Severity: Medium

Additional bugs documented in `QA_FULL_BUG_REPORTS.md`.

## Cross-Browser/Device
- Chrome (desktop): Passed core scenarios
- Safari/Firefox (desktop): Spot checks OK for listing/cart; verify toasts and focus outlines
- Mobile (iOS/Android via devtools): Layout responsive; navbar collapses; action buttons usable

## Suggestions
- Persist AI Catalog mode in URL or localStorage for better UX
- Show variant in cart line items and ensure variant forms part of cart key
- Add stock validation on cart page quantity controls
- Standardize error toasts for offline/network failures
- Improve keyboard focus outlines for accessibility; ensure Enter/Space triggers Add to Cart

## Media Attachments
- Example (add screenshots/recordings to project root and link):
  - `![Bug 002 - Out of Stock Button](./Bug-002_OutOfStockButton.png)`
  - `![Responsive Grid Overflow](./TC-RESP-001_Overflow.png)`
  - `![Offline Error Toast](./TC-ERR-001_Offline.png)` 