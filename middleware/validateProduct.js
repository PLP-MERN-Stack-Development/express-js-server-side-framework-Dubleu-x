const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (req.method === 'POST') {
    // All fields required when creating a new product
    if (!name || !description || !price || !category || typeof inStock !== 'boolean') {
      return res.status(400).json({ error: 'Invalid product data. All fields are required.' });
    }
  }

  if (req.method === 'PUT') {
    // At least one field must be provided when updating
    if (
      name === undefined &&
      description === undefined &&
      price === undefined &&
      category === undefined &&
      inStock === undefined
    ) {
      return res.status(400).json({ error: 'At least one field is required to update.' });
    }
  }

  next();
};

module.exports = validateProduct;
