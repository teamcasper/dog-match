const router = require('express').Router();
const User = require('../models/User');

module.exports = router
    .post('/', (req, res) => {
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
        })
            .then((user => res.json(user)));
    })

    .get('/', (req, res) => {
        User.find()
            .then(users => res.json(users));
    });