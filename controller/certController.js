/* eslint-disable prefer-destructuring */
/* eslint-disable no-new */
/* eslint-disable node/no-unsupported-features/es-syntax */

const ethers = require('ethers');

const fs = require('fs');

const catchAsync = require('./../utils/catchAsync');
const certModel = require('./../model/certModel');
const userModel = require('./../model/userModel');
const AppError = require('./../utils/appError');

const provider = new ethers.providers.JsonRpcBatchProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const abi = fs.readFileSync(
    './contracts/Certificate_sol_Certificate.abi',
    'utf-8'
);
const bin = fs.readFileSync(
    './contracts/Certificate_sol_Certificate.bin',
    'utf-8'
);

const contractFactory = new ethers.ContractFactory(abi, bin, wallet);

exports.createCertificate = catchAsync(async (req, res, next) => {
    const student = await userModel.findOne({ email: req.body.student_email });

    if (!student) {
        return new AppError('User with this email doesnot exist', 400);
    }
    const newCert = await certModel.create({
        name: req.body.name,
        student: student._id,
        company: req.user._id
    });
    const contract = await contractFactory.attach(process.env.CONTRACT_ADDRESS);
    const cert = await certModel
        .findById(newCert._id, '+name +student -company -__v')
        .populate({
            path: 'student',
            select: '+name +email +mobile -_id -id -__v -role'
        });
    console.log(student._id);
    console.log(cert._id);
    await contract.generateCertificate(
        `${cert._id}`,
        `${student._id}`,
        `${req.user._id}`,
        `${req.body.name}`
    );
    return res.status(201).json({
        status: 'success',
        message: 'successfully created certificate',
        data: { cert }
    });
});

exports.getAllCertificates = catchAsync(async (req, res, next) => {
    const certificates = await certModel
        .find(
            { company: req.user._id, active: true },
            '+name +student -company -__v'
        )
        .populate({
            path: 'student',
            select: '+name +email +mobile -_id -id -__v -role'
        });

    return res.status(200).json({
        status: 'success',
        data: { certificates }
    });
});

exports.deleteCertificate = catchAsync(async (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError('Cannot delete unexisting documnet'));
    }
    await certModel.findOneAndUpdate(
        { _id: req.params.id, company: req.user._id },
        { active: false }
    );
    return res.status(204).json({ status: 'success' });
});

exports.verifyCertificate = catchAsync(async (req, res, next) => {
    const contract = await contractFactory.attach(process.env.CONTRACT_ADDRESS);
    console.log(req.body.id);
    const data = await contract.getData(`${req.body.id}`);
    res.status(200).json({ data });
});
