const auth = require('../middleware/auth');
const {User, validate} = require('../models/user');
const _ = require('lodash');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();


// GET/api/users/me
router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

// POST /api/users
router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user  = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token  = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

});

// PUT /api/users/me
router.put('/me', auth, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, {
        name: req.body.name,
        email: req.body.email
    }, {new: true});
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
    }
);

// DELETE /api/users/me
router.delete('/me', auth,  async (req, res) => {
    const user = await User.findByIdAndRemove(req.user._id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
});

// GET /api/users/logout
router.get('/logout', async (req, res) => {
    res.send('logout');
});

module.exports = router;
