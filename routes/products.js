const express = require('express');
const router = express.Router();
const { Product, validate } = require('../models/product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// GET /api/products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort('name');
        res.send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).send('The product with the given ID was not found.');

        res.send(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST /api/products
router.post('/', auth, async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: req.body.image,
            discount: req.body.discount,
            rating: req.body.rating,
            originalPrice: req.body.originalPrice,
        });

        await product.save();

        res.send(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// PUT /api/products/:id
router.put('/:id', auth, async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                category: req.body.category,
                image: req.body.image,
                discount: req.body.discount,
                rating: req.body.rating,
                originalPrice: req.body.originalPrice,
            },
            { new: true }
        );

        if (!product) return res.status(404).send('The product with the given ID was not found.');

        res.send(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE /api/products/:id
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);

        if (!product) return res.status(404).send('The product with the given ID was not found.');

        res.send(product);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
