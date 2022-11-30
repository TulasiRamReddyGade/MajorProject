const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

const url = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('Connected to mongodb atlas');
    })
    .catch(err => {
        console.log(err);
    });
