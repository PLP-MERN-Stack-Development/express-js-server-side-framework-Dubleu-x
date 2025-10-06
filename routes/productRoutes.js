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

const auth = require('../middleware/validateProduct');

// CRUD Routes
router.get('/', getAllProducts);
router.get('stats', getProductStats);
router.get('/:id', getProductsById);
router.get('/', auth, validateProduct, createProduct);
router.get('/:id', auth, validateProduct, updateProduct);
router.get('/:id', auth, deleteProduct);

module.exports = router;