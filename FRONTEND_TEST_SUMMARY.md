# Frontend Developer Test - Completed

## Demo Link
**Local Demo**: http://localhost:3000 (when running `npm run client`)

## ProductCard Component Features

### ✅ All Requirements Met:
- **Product image** - Responsive with aspect ratio (4:3)
- **Product name** - Truncated with tooltip for long titles
- **Product price** - Formatted with currency symbol
- **Variant dropdown** - S/M/L default or custom options
- **Add to Cart button** - Redux integration with toast notifications
- **Out of Stock state** - Disabled controls and "Out of Stock" text
- **Clean modern layout** - Bootstrap 5 cards with shadows

### Layout Approach
**Responsive Grid System**: Uses Bootstrap's responsive classes (`col-lg-3 col-md-4 col-sm-6 col-12`) to create a fluid grid that adapts from 4 columns on large screens down to 1 column on mobile. Each card maintains consistent height using flexbox (`d-flex`) and the card body uses `flex-column` to push the "Add to Cart" button to the bottom.

### Responsiveness Considerations
- **Mobile-first design**: Cards stack vertically on small screens
- **Aspect ratio**: Images maintain 4:3 ratio across all screen sizes
- **Touch-friendly**: Buttons and dropdowns sized for mobile interaction
- **Text truncation**: Long product names and descriptions are truncated with ellipsis
- **Flexible pricing**: Handles various price formats (strings, numbers, null values)

## Component Structure

```jsx
<ProductCard 
  product={productData}
  onAddToCart={handleAddToCart}
/>
```

### Product Data Format
```javascript
{
  id: "123245",
  title: "Product Name",
  description: "Product description",
  price: "19.99",
  imageUrl: "https://example.com/image.jpg",
  variants: ["S", "M", "L"], // optional
  inStock: true, // optional
  category: "Apparel" // optional
}
```

## Files Created/Modified
- `src/components/ProductCard.jsx` - Main component
- `src/components/Products.jsx` - Updated to use ProductCard
- `src/pages/ProductCardDemo.jsx` - Demo page
- `src/setupProxy.js` - API proxy for development
- `package.json` - Added http-proxy-middleware

## Running the Demo

```bash
# Terminal 1: Start backend
export TEST_MODE=json
export PORT=4001
npm run server

# Terminal 2: Start frontend
npm run client

# Visit: http://localhost:3000
```

## Features Demonstrated
- ✅ Responsive grid layout (4/3/2/1 columns)
- ✅ Product image with aspect ratio
- ✅ Product name and description
- ✅ Price formatting
- ✅ Variant dropdown (S/M/L or custom options)
- ✅ Add to Cart button with Redux integration
- ✅ Out of Stock state with disabled controls
- ✅ Modern card design with shadows
- ✅ Bootstrap 5 styling
- ✅ Real API integration
- ✅ Toast notifications
- ✅ Loading states 