const router = require('express').Router();
const Dog = require('../models/Dog');
const ensureAuth = require('../util/ensure-auth');
const ensureSameUser = require('../util/ensure-same-user');
const User = require('../models/User');
const radiusMiddleware = require('../util/radius-middleware');
const cityMiddleware = require('../util/city-middleware');

module.exports = router
    .post('/', ensureAuth, (req, res) => {
        const {
            name,
            breed,
            description,
            weight,
            predictedWeight,
            price,
            photoUrl,
            age,
            spayedOrNeutered,
            personalityAttributes,
            healthIssues,
            healthRating,
            healthDetails,
            password
        } = req.body;

        Dog.create({
            name,
            breed,
            description,
            weight,
            predictedWeight,
            price,
            photoUrl,
            age,
            spayedOrNeutered,
            personalityAttributes,
            dogProvider: req.user._id,
            healthIssues,
            healthRating,
            healthDetails,
            password
        })
            .then((dog => res.json(dog)));
    })

    //fix line 60 and ALL OF IT``//
    .get('/', radiusMiddleware, cityMiddleware, (req, res, next) => {
        if(req.query.zip && req.query.radius) {
            User.find({ 'address.zip': req.body.zipCodes })
                .then(users => {
                    Dog.find({ dogProvider: users._id });
                })
                .catch(next);
        }
        if(req.query.zip && req.query.citySearch) {
            User.find({ 'address.city': req.body.city })
                .then(users => {
                    return Dog.find({ dogProvider: users._id });
                })
                .catch(next);
        }
        if(req.query.zip){
            User.find({ 'address.zip': req.query.zip })
                .then(users => {
                    Dog.find({ dogProvider: users._id });
                })
                .catch(next);
        }
        Dog.find()
            .then(dogs => res.json(dogs))
            .catch(next);
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Dog.findById(id)
            .then(dog => res.json(dog));
    })

    .delete('/:id', ensureAuth, ensureSameUser({ finder: Dog.findOne, context: Dog, key: 'dogProvider' }), (req, res) => {
        const { id } = req.params;
        Dog.findByIdAndDelete(id).then(dog => res.json({ removed: !!dog }));
    })

    .put('/:id', ensureAuth, ensureSameUser({ finder: Dog.findOne, context: Dog, key: 'dogProvider' }), (req, res) => {
        const { id } = req.params;
        const {
            name,
            breed,
            description,
            weight,
            predictedWeight,
            price,
            photoUrl,
            age,
            spayedOrNeutered,
            personalityAttributes,
            healthIssues,
            healthRating,
            healthDetails,
            password
        } = req.body;

        Dog.findByIdAndUpdate(
            id, 
            {
                name,
                breed,
                description,
                weight,
                predictedWeight,
                price,
                photoUrl,
                age,
                spayedOrNeutered,
                personalityAttributes,
                dogProvider: req.user._id,
                healthIssues,
                healthRating,
                healthDetails,
                password
            }, { new: true })

            .then(dog => res.json(dog));
    });
