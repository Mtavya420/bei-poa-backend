const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Cart, validate} = require("../models/cart");

// GET /api/cart
router.get('/', async (req, res) => {
    const cart = await Cart.find().sort('name');
    res.send(cart);
});

// GET /api/cart/:id
router.get('/:id', async (req, res) => {
    const cart = await Cart.findById(req.params.id);

    if (!cart) return res.status(404).send('The cart with the given ID was not found.');

    res.send(cart);
});

// POST/api/cart
router.post('/', [auth, admin, validate], async (req, res) => {
    let cart = new Cart({name: req.body.name});
    cart = await cart.save();

    res.send(cart);
});

// PUT /api/cart/:id
router.put('/:id', [auth, admin, validate], async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});

    if (!cart) return res.status(404).send('The cart with the given ID was not found.');

    res.send(cart);
});

// DELETE /api/cart/:id
router.delete('/:id', [auth, admin], async (req, res) => {
    const cart = await Cart.findByIdAndRemove(req.params.id);

    if (!cart) return res.status(404).send('The cart with the given ID was not found.');

    res.send(cart);
});

module.exports = router;

