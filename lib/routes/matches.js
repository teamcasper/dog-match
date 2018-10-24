const router = require('express').Router();
const Match = require('../models/Match');
// const ensureAuth = require('../util/ensure-auth');
// const ensureSameUser = require('../util/ensure-same-user');

module.exports = router
    .post('/', (req, res, next) => {
        const { seeker, provider, dog, datePosted, dateFulfilled, feePaid } = req.body;

        Match.create({ seeker, provider, dog, datePosted, dateFulfilled, feePaid })
            .then((match => res.json(match)))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Match.find()
            .then(matches => res.json(matches))
            .catch(next);
    })

// .delete('/:id', ensureAuth, (req, res, next) => {
//     const { id } = req.params;
//     Match.findByIdAndDelete(id)
//         .then(match => res.json({ removed: !!match }))
//         .catch(next);
// })

    .put('/:id', (req, res, next) => {
        const { id } = req.params;
        const { seeker, provider, dog, datePosted, dateFulfilled, feePaid } = req.body;
        Match.findByIdAndUpdate(
            id, 
            { seeker, provider, dog, datePosted, dateFulfilled, feePaid }, 
            { new: true })
            .then(match => res.json(match))
            .catch(next);
    });
