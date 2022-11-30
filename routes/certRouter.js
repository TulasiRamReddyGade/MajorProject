const router = require('express').Router();
const authController = require('./../controller/authController');
const certController = require('./../controller/certController');

router
    .route('/')
    .post(
        authController.authenticate,
        authController.restrictTo('institution'),
        certController.createCertificate
    )
    .get(
        authController.authenticate,
        authController.restrictTo('institution'),
        certController.getAllCertificates
    );
router
    .route('/:id')
    .patch(
        authController.authenticate,
        authController.restrictTo('institution'),
        certController.deleteCertificate
    );

router.route('/verify').post(certController.verifyCertificate);
module.exports = router;
