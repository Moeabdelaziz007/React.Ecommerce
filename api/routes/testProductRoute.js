const express = require('express');
const { listProducts, getProductById, createProduct } = require('../controllers/testProductController');

const router = express.Router();

// GET /products and GET /products?category=Apparel
router.get('/products', listProducts);

// GET /products/:id
router.get('/products/:id', getProductById);

// POST /products (optional/bonus)
router.post('/products', createProduct);

module.exports = router; 