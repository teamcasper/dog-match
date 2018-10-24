const router = require('express').Router();
const Dog = require('../models/Dog');
const ensureAuth = require('../util/ensure-auth');
const ensureSameUser = require('../util/ensure-same-user');

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

    .get('/', (req, res) => {
        Dog.find()
            .then(dogs => res.json(dogs));
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
