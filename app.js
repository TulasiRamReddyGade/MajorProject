// 3rd party packages
const express = require('express');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const cors = require('cors');
// imports from project
const userRouter = require('./routes/userRouter');
const errorController = require('./controller/errorController');
const certRouter = require('./routes/certRouter');

const app = express();

// middlewares

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieparser());

const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/cert', certRouter);

app.use(errorController);

app.use((req, res, next, err) => {
    console.log(err);
});

module.exports = app;
