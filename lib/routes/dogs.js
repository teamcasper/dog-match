const router = require('express').Router();
const Dog = require('../models/Dog');
const ensureAuth = require('../util/ensure-auth');
const ensureSameUser = require('../util/ensure-same-user');
const User = require('../models/User');
const radiusMiddleware = require('../util/radius-middleware');
const cityMiddleware = require('../util/city-middleware');
const getUserQuery = require('./helpers/get-user-query');
const getDogQuery = require('../util/dog-query');

module.exports = router
    .post('/', ensureAuth, (req, res, next) => {
        const {
            name,
            breed,
            description,
            weight,
            predictedWeight,
            price,
            photoUrl,
            ageInMonths,
            spayedOrNeutered,
            personalityAttributes,
            healthIssues,
            healthRating,
            healthDetails,
            password,
            gender
        } = req.body;

        Dog.create({
            name,
            breed,
            description,
            weight,
            predictedWeight,
            price,
            photoUrl,
            ageInMonths,
            spayedOrNeutered,
            personalityAttributes,
            dogProvider: req.user._id,
            healthIssues,
            healthRating,
            healthDetails,
            password,
            gender
        })
            .then((dog => res.json(dog)))
            .catch(next);
    })

    .get('/', radiusMiddleware, cityMiddleware, (req, res, next) => {
        const userQuery = getUserQuery(req);
        const dogQuery = getDogQuery(req.query);
  
        if(userQuery) {
            User.find(userQuery)
                .then(users => {
                    const userIds = users.map(user => user._id);
                    Dog.find({ ...dogQuery, dogProvider: userIds })
                        .populate({ 
                            path: 'dogProvider', select: 'address preferredContact businessInfo'
                        })
                        .then(dogs => {
                            res.json(dogs);
                        })
                        .catch(next);
                });
        } else {
            Dog.find(dogQuery)
                .populate({ 
                    path: 'dogProvider', select: 'address preferredContact businessInfo'
                })
                .then(dogs => res.json(dogs))
                .catch(next);
        }
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;
        Dog.findById(id)
            .populate({ 
                path: 'dogProvider', select: 'address preferredContact businessInfo'
            })
            .then(dog => res.json(dog))
            .catch(next);
    })

    .delete('/:id', ensureAuth, ensureSameUser({ finder: Dog.findOne, context: Dog, key: 'dogProvider' }), (req, res, next) => {
        const { id } = req.params;
        Dog.findByIdAndDelete(id)
            .then(dog => res.json({ removed: !!dog }))
            .catch(next);
    })

    .put('/:id', ensureAuth, ensureSameUser({ finder: Dog.findOne, context: Dog, key: 'dogProvider' }), (req, res, next) => {
        const { id } = req.params;
        const {
            name,
            breed,
            description,
            weight,
            predictedWeight,
            price,
            photoUrl,
            ageInMonths,
            spayedOrNeutered,
            personalityAttributes,
            healthIssues,
            healthRating,
            healthDetails,
            password,
            gender
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
                ageInMonths,
                spayedOrNeutered,
                personalityAttributes,
                dogProvider: req.user._id,
                healthIssues,
                healthRating,
                healthDetails,
                password,
                gender
            }, { new: true })
            .then(dog => res.json(dog))
            .catch(next);
    })

    .get('/ags/dogsByCityAndAvgPrice', (req, res, next) => {
        
        Dog
            .dogsByCityAndAvgPrice()
            .then(result => res.json(result))
            .catch(next);
    })

    .get('/ags/avgPriceByZip', (req, res, next) => {
        Dog.avgPriceByZip()
            .then(result => res.json(result))
            .catch(next);
    });




