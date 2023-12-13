const express = require('express');
const router = express.Router();
const {Product, validate} = require('../models/product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// GET /api/products
router.get('/', async (req, res) => {
    const products = await Product.find().sort('name');
    res.send(products);
});

// GET /api/products/:id

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
});

// POST /api/products
router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        category: req.body.category
    });
    product = await product.save();

    res.send(product);
});

// PUT /api/products/:id
router.put('/:id', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        category: req.body.category
    }, {new: true});

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
});

// DELETE /api/products/:id
router.delete('/:id', [auth, admin], async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
});

module.exports = router;
