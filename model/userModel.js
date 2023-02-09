/* eslint-disable prefer-destructuring */
/* eslint-disable no-new */
/* eslint-disable node/no-unsupported-features/es-syntax */

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema(
    {
        name: {
            type: 'string',
            required: [true, 'please provide your name']
        },
        role: {
            type: 'string',
            enum: ['Student', 'Institution', 'Admin'],
            default: 'student'
        },
        email: {
            type: 'string',
            unique: true,
            required: [true, 'Please provide your email'],
            lowercase: true,
            validate: [validator.isEmail, 'Please enter valid email id']
        },
        password: {
            type: 'string',
            required: [true, 'Please provide your password'],
            minlength: 8,
            select: false
        },
        passwordConfirm: {
            type: 'string',
            required: [true, 'Please provide your confirm password'],
            validate: {
                validator: function(val) {
                    return this.password === val;
                },
                message: 'password and passwordConfirm should be same'
            }
        },
        mobile: {
            type: 'string',
            required: true,
            unique: true
            // validate: [validator.isMobilePhone(this.mobile)]
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordRestTokenExpiresIn: Date,
        active: {
            type: 'boolean',
            default: true,
            select: false
        }
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

schema.pre('save', async function(next) {
    if (!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

schema.methods.checkPassword = async function(hashed, nonHashed) {
    return await bcrypt.compare(nonHashed, hashed);
};
const model = mongoose.model('users', schema);
module.exports = model;
