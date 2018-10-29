const router = require('express').Router();
const User = require('../models/User');
const { HttpError } = require('../util/errors');
const ensureAuth = require('../util/auth/ensure-auth');

module.exports = router
    .post('/', (req, res, next) => {
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
            .then((user => res.json(user)))
            .catch(next);
    })

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
            password })
            .then((user => res.json(user)))
            .catch(next);
    })

    .post('/signin', (req, res, next) => {
        const { email, password } = req.body;
        User.findOne({ email })
            .then(user => {
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
            })
            .catch(next);
    })

    .get('/verify', ensureAuth, (req, res) => {
        res.json({ success: !!req.user });
    })

    .get('/', (req, res, next) => {
        User.find()
            .select({ __v: false })
            .lean()
            .then(users => res.json(users))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;
        User.findById(id)
            .select({ __v: false })
            .lean()
            .then(user => res.json(user))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        const { id } = req.params;
        User.findByIdAndDelete(id)
            .then(user => res.json({ removed: !!user }))
            .catch(next);
    })
    
    .put('/:id', (req, res, next) => {
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
            .select({ __v: false })
            .lean()
            .then(user => res.json(user))
            .catch(next);
    });
