const validateProduct = (req,res, next) => {
    const { name, description, price, category, instock } = req.body;
    if (!name || !description || !price || !category || typeof inStock !== 'boolean') {
        return res.status(400).json({ error: 'Invalid product data. All fields are required.' });
    }
    next();
};

module.exports = validateProduct;