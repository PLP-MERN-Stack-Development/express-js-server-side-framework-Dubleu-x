const { v4: uuidv4 } = require('uuid');
let products = require('../data/products');

// GET all products (filtering, search, pagination)
exports.getAllProducts = (req, res) => {
    let result = [...products];
    const { category, search, page = 1, limit = 5 } = req.query;

    if (category) {
        result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
        result = result.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    const start = (page - 1) * limit;
    const paginated = result.slice(start, start + +limit);

    res.json({
        total: result.length,
        page: +page,
        limit: +limit,
        data: paginated
    });
};

// GET product by ID 
exports.getProductsById = (req, res, next) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        const err = new Error('Product not found');
        err.status = 404;
        return next(err);
    }
    res.json(product);
};

// POST new product
exports.createProduct = (req, res, next) => {
    try {
        const { name, description, price, category, inStock } = req.body;
        const newProduct = { id: uuidv4(), name, description, price, category, inStock };
        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
};

// PUT update product 
exports.updateProduct = (req, res, next) => {
    try {
        const index = products.findIndex(p => p.id === req.params.id);
        if (index === -1) {
            const err = new Error('Product not found');
            err.status = 404;
            throw err;
        }
        products[index] = { ...products[index], ...req.body };
        res.json(products[index]);
    } catch (err) {
        next(err);
    }
};

// DELETE product
exports.deleteProduct = (req, res, next) => {
    try {
        const index = products.findIndex(p => p.id === req.params.id);
        if (index === -1) {
            const err = new Error('Product not found');
            err.status = 404;
            throw err;
        }
        const deleted = products.splice(index, 1);
        res.json({ message: 'Product deleted', deleted });
    } catch (err) {
        next(err);
    }
};

// GET product stats
exports.getProductStats = (req, res) => {
    const stats = products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {});
    res.json({ totalProducts: products.length, stats });
};
