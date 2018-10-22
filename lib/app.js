
const express = require('express');
const app = express();
const morgan = require('morgan');
const { handler } = require('./util/errors');

app.use(morgan('dev', {
    skip() {
        return process.env.NODE_ENV === 'test';
    }
}));

app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/breeds', require('./routes/breeds'));
app.use('/api/dogs', require('./routes/dogs'));

app.use(handler);

module.exports = app;
