const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 55,
    },
    price: {
        type: String, // Change type to String to match the frontend schema
        required: true,
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
    discount: {
        type: String, // Add discount field to match the frontend schema
    },
    rating: {
        type: Number, // Add rating field to match the frontend schema
    },
    originalPrice: {
        type: String, // Add originalPrice field to match the frontend schema
    },
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(55).required(),
        price: Joi.string().required(), // Change to string to match the frontend schema
        category: Joi.string().min(5).max(55).required(),
        description: Joi.string().min(5).max(255).required(),
        image: Joi.string().min(5).max(255).required(),
        discount: Joi.string(), // Add discount field to match the frontend schema
        rating: Joi.number(), // Add rating field to match the frontend schema
        originalPrice: Joi.string(), // Add originalPrice field to match the frontend schema
    });

    return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
