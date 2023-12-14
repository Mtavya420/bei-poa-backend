const {json, urlencoded} = require("express");
const cookieParser = require("cookie-parser");
const express = require("express");
const usersRouter = require("../routes/users");
const productsRouter = require("../routes/products");
const auth = require("../routes/auth");
const cart = require("../routes/cart");
const categories = require("../routes/categories");
const search = require("../routes/search");
const error = require("../middleware/error");
const logger = require("morgan");

module.exports = function (app) {
    app.use(logger('dev'));
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use('/api/users', usersRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/auth', auth);
    app.use('/api/cart', cart);
    app.use('/api/categories', categories);
    app.use('/api/search', search);

    app.use(error);

}
