/* eslint-disable prefer-destructuring */
/* eslint-disable no-new */
/* eslint-disable node/no-unsupported-features/es-syntax */

const userModel = require('../model/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res) => {
    console.log(1);
    const newUser = await userModel.create({ email: req.body.email });
    console.log(2);
    return res.status(201).json({
        message: 'successfully created user',
        staus: 'success',
        data: { newUser }
    });
});
