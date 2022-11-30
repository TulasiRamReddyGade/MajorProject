const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        name: {
            type: 'string',
            required: [true, 'Please provide Certificate Name']
        },
        student: {
            type: mongoose.Schema.ObjectId,
            ref: 'users',
            required: true
        },
        company: {
            type: mongoose.Schema.ObjectId,
            ref: 'users',
            required: true
        },
        active: {
            type: 'boolean',
            default: 'true'
        }
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const model = mongoose.model('certificates', schema);
module.exports = model;
