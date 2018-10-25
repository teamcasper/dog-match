const { sign, verify } = require('jsonwebtoken');
const APP_SECRET = 'some_password';

const tokenize = payload => {
    return sign({ payload }, APP_SECRET, { expiresIn: '24h' });
}; '';

const untokenize = token => {
    return verify(token, APP_SECRET).payload;
};

module.exports = {
    tokenize,
    untokenize
};

