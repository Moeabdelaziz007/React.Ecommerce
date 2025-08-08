# Backend Developer Test - Completed

## Tech Stack
- **Node.js** with Express framework
- **File-based JSON storage** (no database required for test mode)
- **RESTful API design** with proper HTTP status codes

## How to Run
```bash
# Install dependencies
npm install

# Run in test mode (JSON-backed API)
export TEST_MODE=json
export PORT=4001
npm run server

# Server runs at http://localhost:4001
```

## API Endpoints

### 1. GET `/api/v1/products`
Returns all products from JSON file.

**Response:**
```json
[
  {
    "id": "123245",
    "title": "A Book", 
    "imageUrl": "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
    "description": "This is an awesome book!",
    "price": "19"
  }
]
```

### 2. GET `/api/v1/products/:id`
Returns single product by ID.

**Response:**
```json
{
  "id": "123245",
  "title": "A Book",
  "imageUrl": "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg", 
  "description": "This is an awesome book!",
  "price": "19"
}
```

### 3. GET `/api/v1/products?category=Apparel`
Filters products by category (case-insensitive).

**Response:**
```json
[
  {
    "id": "1754639233525",
    "title": "Test Shirt",
    "description": "Cotton tee",
    "price": 25,
    "imageUrl": "https://example.com/img.jpg",
    "category": "Apparel"
  }
]
```

### 4. POST `/api/v1/products` (Bonus)
Creates new product with validation.

**Request Body:**
```json
{
  "title": "New Product",
  "description": "Product description", 
  "price": 29.99,
  "category": "Electronics",
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "id": "1754639233525",
  "title": "New Product",
  "description": "Product description",
  "price": 29.99,
  "imageUrl": "https://example.com/image.jpg",
  "category": "Electronics"
}
```

## Sample cURL Requests

```bash
# Get all products
curl http://localhost:4001/api/v1/products

# Get product by ID
curl http://localhost:4001/api/v1/products/123245

# Filter by category
curl "http://localhost:4001/api/v1/products?category=Apparel"

# Create new product
curl -X POST http://localhost:4001/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Product",
    "description": "Product description",
    "price": 29.99,
    "category": "Electronics",
    "imageUrl": "https://example.com/image.jpg"
  }'
```

## Files Modified/Created
- `api/controllers/testProductController.js` - JSON-backed product controller
- `api/routes/testProductRoute.js` - Product routes for test mode
- `api/app.js` - Conditional route mounting for test mode
- `Backend_Test_Collection.json` - Postman collection
- `README.md` - Updated with test instructions

## Data Persistence
Products are stored in `api/data/products.json` and persist between server restarts.

## Validation
POST endpoint validates required fields (title, description, price) and returns 400 with error details if validation fails. 