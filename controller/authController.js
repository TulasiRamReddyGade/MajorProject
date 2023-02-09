/* eslint-disable prefer-destructuring */
/* eslint-disable no-new */
/* eslint-disable node/no-unsupported-features/es-syntax */

const jwt = require('jsonwebtoken');

const userModel = require('../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const cookieOptions = {
    expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
};

if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
}

const signToken = (res, statusCode, user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SCRETE, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    res.cookie('CertificateGeneration', token, cookieOptions);
    user.password = undefined;
    if (statusCode === 200) {
        // eslint-disable-next-line prettier/prettier
        return res.status(statusCode).json({
            status: 'success',
            message: 'successfully logged in',
            token,
            data: { user }
        });
    }
    return res.status(statusCode).json({ status: 'Success', token });
};

const jwtVerifyAsync = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SCRETE, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    if (req.body.role === 'admin') {
        return next(
            new AppError('This Operation is not allowed to perform', 400)
        );
    }
    // console.log(req.body);
    const newUser = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
        mobile: req.body.mobile
    });
    return res.status(201).json({
        message: 'successfully created user',
        staus: 'success',
        data: { newUser }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next(new AppError('Please enter valid email or password'), 400);
    }
    const user = await userModel
        .findOne({ email: req.body.email })
        .select('+password');
    if (!user)
        return next(new AppError('Please enter valid email or password'), 400);

    const verify = await user.checkPassword(user.password, req.body.password);
    if (!verify)
        return next(new AppError('Please enter valid email or password', 400));

    return signToken(res, 200, user);
});

exports.authenticate = catchAsync(async (req, res, next) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer ')
    ) {
        return next(new AppError('Your not logged in. Please login', 401));
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(new AppError('Your not logged in. Please login', 401));
    }
    const decode = await jwtVerifyAsync(token);

    const user = await userModel.findOne({ _id: decode.id, active: true });
    if (!user) {
        return next(
            new AppError(
                'The user belonging to this token no longer exist',
                401
            )
        );
    }
    req.user = user;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You are restricted to perform this action', 403)
            );
        }
        next();
    };
};
