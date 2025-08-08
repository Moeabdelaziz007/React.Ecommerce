# Full QA Bug Reports

## Bug #1: Variant Information Missing in Cart
- Bug Title: Selected variant is not displayed in cart entries
- Steps to Reproduce:
  1. On listing, pick a product with variants
  2. Select variant "M" and click Add to Cart
  3. Open the cart page
- Actual Result: Cart shows product title and price, but not selected variant
- Expected Result: Cart line item clearly shows selected variant (e.g., Size: M)
- Severity: Medium

## Bug #2: Cart Subtotal Precision Risks
- Bug Title: Potential rounding inaccuracies with decimal prices
- Steps to Reproduce:
  1. Add items with $x.99 prices and increase quantities
  2. Observe subtotal precision and final totals
- Actual Result: Risk of rounding or precision errors if rounding applied prematurely (implementation-dependent)
- Expected Result: Subtotals should be precise to two decimals; rounding only on final display
- Severity: High

## Bug #3: Stock Validation Missing on Quantity Increase in Cart
- Bug Title: Users can increase quantity beyond available stock from cart
- Steps to Reproduce:
  1. Add in-stock item to cart
  2. Open cart and click + repeatedly
- Actual Result: No stock cap validation; quantity can exceed stock
- Expected Result: Block increments when stock limit reached and show warning
- Severity: High

## Bug #4: localStorage Corruption Breaks Cart
- Bug Title: Invalid JSON in localStorage causes cart crash
- Steps to Reproduce:
  1. Manually set localStorage key used by cart to invalid JSON
  2. Refresh page and open cart
- Actual Result: JSON.parse throws error; cart unusable
- Expected Result: Graceful fallback to empty cart with error handling
- Severity: Medium

## Bug #5: Out-of-Stock Feedback Insufficient
- Bug Title: Disabled Add to Cart without contextual message
- Steps to Reproduce:
  1. Find out-of-stock product
  2. Observe button and messages
- Actual Result: Button disabled; no explanatory toast/message
- Expected Result: Clear message indicating out-of-stock reason
- Severity: Low

## Bug #6: Rapid Add to Cart Clicks Create Duplicates
- Bug Title: No debounce/disable on rapid Add to Cart clicks
- Steps to Reproduce:
  1. Rapidly click Add to Cart (5+ times) on a product
  2. View cart
- Actual Result: Multiple entries or excessive quantity; overlapping toasts
- Expected Result: Single entry; disabled button/loader during processing
- Severity: Medium

## Bug #7: Keyboard Accessibility Inconsistencies
- Bug Title: Add to Cart not reliably operable via Enter/Space; focus outline may be unclear
- Steps to Reproduce:
  1. Tab to Add to Cart
  2. Press Enter/Space
- Actual Result: Action may not trigger in some browsers; outline not prominent
- Expected Result: Action triggers; visible focus outline
- Severity: Medium

## Bug #8: Error Handling for Offline Add to Cart
- Bug Title: Weak UX on offline add attempt (missing clear error state)
- Steps to Reproduce:
  1. Go offline and click Add to Cart
- Actual Result: Generic failure; unclear messaging
- Expected Result: Specific toast "You appear offline. Try again"; no cart mutation
- Severity: Medium

## Bug #9: AI Catalog Mode State Not Persisted Across Refresh (UX)
- Bug Title: AI mode resets on reload
- Steps to Reproduce:
  1. Open /ai and select "Dynamic Pricing"
  2. Refresh page
- Actual Result: Mode resets to default
- Expected Result: Mode persisted in URL or localStorage
- Severity: Low 