const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Category,validate: validateCategory} = require('../models/category');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');



// GET /api/categories
router.get('/', async (req, res) => {
    const categories = await Category.find().sort('name');
    res.send(categories);
});

// GET /api/categories/:id
router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).send('The category with the given ID was not found.');

    res.send(category);
});

// POST/api/categories
router.post('/', [auth, admin, validateCategory], async (req, res) => {
    let category = new Category({
        name: req.body.name,
        description: req.body.description,
    });
    category = await category.save();

    res.send(category);
});

// PUT /api/categories/:id
router.put('/:id', [auth, admin, validateCategory], async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
    }, { new: true });

    if (!category) return res.status(404).send('The category with the given ID was not found.');

    res.send(category);
});

// DELETE /api/categories/:id
router.delete('/:id', [auth, admin], async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) return res.status(404).send('The category with the given ID was not found.');

    res.send(category);
});

module.exports = router;;
