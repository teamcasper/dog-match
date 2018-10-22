
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

app.use(handler);
app.use('/api/users', require('./routes/users'));
app.use('/api/matches', require('./routes/matches'));


module.exports = app;
