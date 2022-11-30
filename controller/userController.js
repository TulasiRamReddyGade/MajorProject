/* eslint-disable prefer-destructuring */
/* eslint-disable no-new */
/* eslint-disable node/no-unsupported-features/es-syntax */

const catchAsync = require('./../utils/catchAsync');
const userModel = require('./../model/userModel');

exports.getUsers = catchAsync(async (req, res, next) => {
    const user = await userModel.find();
    return res.status(200).json({ status: 'success', data: { user } });
});
