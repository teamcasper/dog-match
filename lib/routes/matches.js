const router = require('express').Router();
const Match = require('../models/Match');
const ensureAuth = require('../util/auth/ensure-auth');
const ensureSameUser = require('../util/auth/ensure-same-user');

module.exports = router
    .post('/', ensureAuth, (req, res, next) => {
        const { provider, dog, datePosted, dateFulfilled, feePaid } = req.body;

        Match.create({ seeker: req.user._id, provider, dog, datePosted, dateFulfilled, feePaid })
            .then((match => res.json(match)))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Match.find()
            .lean()
            .then(matches => res.json(matches))
            .catch(next);
    })

    .delete('/:id', ensureAuth, ensureSameUser({ finder: Match.findOne, context: Match, key: 'seeker' }), (req, res, next) => {
        const { id } = req.params;
        Match.findByIdAndDelete(id)
            .then(match => res.json({ removed: !!match }))
            .catch(next);
    })

    .put('/:id', ensureAuth, ensureSameUser({ finder: Match.findOne, context: Match, key: 'seeker' }), (req, res, next) => {
        const { id } = req.params;
        const { seeker, provider, dog, datePosted, dateFulfilled, feePaid } = req.body;
        Match.findByIdAndUpdate(
            id,
            { seeker, provider, dog, datePosted, dateFulfilled, feePaid },
            { new: true, runValidators: true })
            .lean()
            .then(match => res.json(match))
            .catch(next);
    })

    .get('/ags/successfulMatches', (req, res, next) => {
        Match.successfulMatches()
            .then(result => res.json(result))
            .catch(next);
    });
