const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
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
});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(55).required(),
        description: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(category);
}

exports.validate = validateCategory;

exports.Category = Category;

