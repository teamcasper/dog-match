const router = require('express').Router();
const User = require('../models/User');
const { HttpError } = require('../util/errors');
const ensureAuth = require('../util/auth/ensure-auth');

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

    .post('/signup', (req, res) => {
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
    })

    .post('/signin', (req, res, next) => {
        const { email, password } = req.body;
        User.findOne({ email }).then(user => {
            const correctPassword = user && user.compare(password);
            if(correctPassword) {
                const token = user.authToken();
                res.json({ token });
            }
            else {
                next(new HttpError({
                    code: 401,
                    message: 'Bad email or password'
                }));
            }
        });
    })

    .get('/verify', ensureAuth, (req, res) => {
        res.json({ success: !!req.user });
    })

    .get('/', (req, res) => {
        User.find()
            .then(users => res.json(users));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        User.findById(id)
            .then(user => res.json(user));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        User.findByIdAndDelete(id).then(user => res.json({ removed: !!user }));
    })
    
    .put('/:id', (req, res) => {
        const { id } = req.params;
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

        User.findByIdAndUpdate(
            id, 
            {
                fullName,
                preferredName,
                email,
                role,
                preferredContact,
                address,
                businessInfo,
                password
            }, { new: true })

            .then(user => res.json(user));
    });
