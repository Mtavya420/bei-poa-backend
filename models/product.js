const joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 55,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
    },
    category: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 55,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    image: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(55).required(),
        price: Joi.number().min(0).max(1000).required(),
        category: Joi.string().min(5).max(55).required(),
        description: Joi.string().min(5).max(255).required(),
        image: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;

