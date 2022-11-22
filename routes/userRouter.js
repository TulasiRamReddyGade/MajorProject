const express = require('express');
const authController = require('./../controller/authController');

const router = express.Router();

router.route('/').get((req, res, next) => {
    res.status(200).json({ msg: 'successfully received request' });
});

router.post('/signup', authController.signup);

module.exports = router;
