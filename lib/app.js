
const express = require('express');
const app = express();
const morgan = require('morgan');
const { handler } = require('./util/errors');
const bearerToken = require('./util/bearer-token');
const ensureAuth = require('./util/ensure-auth');

app.use(morgan('dev', {
    skip() {
        return process.env.NODE_ENV === 'test';
    }
}));

app.use(express.static('public'));
app.use(express.json());
app.use(bearerToken);

app.use('/api/users', require('./routes/users'));

app.use('/api/matches', require('./routes/matches'));
app.use('/api/breeds', require('./routes/breeds'));
app.use('/api/dogs', require('./routes/dogs'));

app.use(handler);

module.exports = app;
