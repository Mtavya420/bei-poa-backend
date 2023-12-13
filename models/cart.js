const joi = require('joi');
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
});

const Cart = mongoose.model('Cart', cartSchema);

function validateCart(cart) {
    const schema = Joi.object({
        user: Joi.string().required(),
        products: Joi.array().required(),
    });

    return schema.validate(cart);
}

exports.Cart = Cart;
exports.validate = validateCart;
