const express = require('express');
const router = express.Router();
const { Product, validate } = require('../models/product');

// GET /api/search?q=query
router.get('/', async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Query parameter "q" is required.' });
    }

    try {
        const results = await Product.find({ $text: { $search: q } });
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
