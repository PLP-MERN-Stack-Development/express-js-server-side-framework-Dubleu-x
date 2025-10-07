const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
} = require('../controllers/productController');

const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');

// CRUD + stats routes

// GET all products
router.get('/', getAllProducts);

// GET product stats
router.get('/stats', getProductStats);

// GET product by ID
router.get('/:id', getProductsById);

// CREATE new product
router.post('/', auth, validateProduct, createProduct);

// UPDATE product by ID
router.put('/:id', auth, validateProduct, updateProduct);

// DELETE product by ID
router.delete('/:id', auth, deleteProduct);

module.exports = router;
