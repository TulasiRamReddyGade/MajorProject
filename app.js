// 3rd party packages
const express = require('express');
const morgan = require('morgan');
// Routers
const userRouter = require('./routes/userRouter');

const app = express();

// middlewares

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user', userRouter);

app.use((req, res, next, err) => {
    console.log(err);
});

module.exports = app;
