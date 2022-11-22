const mongoose = require('mongoose');
const validator = require('validator');

const schema = mongoose.Schema({
    email: {
        type: 'string',
        uniqure: true,
        required: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter valid email id']
    }
});

const model = mongoose.model('users', schema);
module.exports = model;
