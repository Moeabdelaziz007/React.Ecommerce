const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'products.json');

function readProducts() {
  try {
    const raw = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function writeProducts(products) {
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
}

function validateProductPayload(body) {
  const errors = [];
  if (!body || typeof body !== 'object') {
    errors.push('Invalid payload');
    return errors;
  }
  if (!body.title || typeof body.title !== 'string') errors.push('title is required');
  if (body.price === undefined || body.price === null || body.price === '') errors.push('price is required');
  if (!body.description || typeof body.description !== 'string') errors.push('description is required');
  return errors;
}

exports.listProducts = (req, res) => {
  const products = readProducts();
  const { category } = req.query;
  let result = products;
  if (category) {
    result = products.filter((p) => {
      // Support either `category` or `categories` field if present in test data
      if (p.category) return String(p.category).toLowerCase() === String(category).toLowerCase();
      if (Array.isArray(p.categories)) return p.categories.map(String).map((s) => s.toLowerCase()).includes(String(category).toLowerCase());
      return false; // if no category info in data, no match
    });
  }
  res.status(200).json(result);
};

exports.getProductById = (req, res) => {
  const products = readProducts();
  const product = products.find((p) => String(p.id) === String(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(product);
};

exports.createProduct = (req, res) => {
  const errors = validateProductPayload(req.body);
  if (errors.length) return res.status(400).json({ message: 'Validation failed', errors });

  const products = readProducts();
  const newProduct = {
    id: req.body.id ? String(req.body.id) : String(Date.now()),
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl || '',
    category: req.body.category || undefined,
  };

  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
}; 