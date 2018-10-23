const router = require('express').Router();
const User = require('../models/User');
const { HttpError } = require('../util/errors');
const ensureAuth = require('../util/ensure-auth');

module.exports = router
    .post('/signup', (req, res, next) => {
        const {
            fullName,
            preferredName,
            email,
            role,
            preferredContact,
            address,
            businessInfo,
            password
        } = req.body;

        User.create({
            fullName,
            preferredName,
            email,
            role,
            preferredContact,
            address,
            businessInfo,
            password
        }).then((user => res.json(user)));
    });