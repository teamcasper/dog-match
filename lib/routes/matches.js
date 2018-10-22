const router = require('express').Router();
const Match = require('../models/Match');

module.exports = router
    .post('/', (req, res, next) => {
        const { seeker, provider, dog, datePosted, dateFulfilled, feePaid } = req.body;

        Match.create({ seeker, provider, dog, datePosted, dateFulfilled, feePaid })
            .then((match => res.json(match)))
            .catch(next);
    });

    // .get('/', (req, res, next) => {
    //     Match.find()
    //         .then(matches => res.json(matches))
    //         .catch(next);
    // });
