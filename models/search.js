const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 55,
    },
    category: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(55).required(),
        category: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(product);
}

exports.validate = validateProduct;
exports.Product = Product;
