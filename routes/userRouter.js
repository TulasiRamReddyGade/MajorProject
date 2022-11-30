const express = require('express');
const authController = require('./../controller/authController');
const userController = require('./../controller/userController');
const router = express.Router();

router
    .route('/')
    .get(
        authController.authenticate,
        authController.restrictTo('admin'),
        userController.getUsers
    );

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
