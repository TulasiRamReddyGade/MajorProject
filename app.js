// 3rd party packages
const express = require('express');
const morgan = require('morgan');
// imports from project
const userRouter = require('./routes/userRouter');
const errorController = require('./controller/errorController');

const app = express();

// middlewares

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user', userRouter);

app.use(errorController);

app.use((req, res, next, err) => {
    console.log(err);
});

module.exports = app;
