/* eslint-disable prefer-destructuring */
/* eslint-disable no-new */
/* eslint-disable node/no-unsupported-features/es-syntax */

const userModel = require('../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.signup = catchAsync(async (req, res) => {
    if (req.body.role === 'admin') {
        return new AppError('This Operation is not allowed to perform', 400);
    }
    const newUser = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        mobile: req.body.mobile
    });
    return res.status(201).json({
        message: 'successfully created user',
        staus: 'success',
        data: { newUser }
    });
});
