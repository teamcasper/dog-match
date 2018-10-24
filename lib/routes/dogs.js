const router = require('express').Router();
const Dog = require('../models/Dog');

module.exports = router
    .post('/', (req, res) => {
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
            dogProvider,
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
            dogProvider,
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

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        Dog.findByIdAndDelete(id).then(dog => res.json({ removed: !!dog }));
    })

    .put('/:id', (req, res) => {
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
            dogProvider,
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
                dogProvider,
                healthIssues,
                healthRating,
                healthDetails,
                password
            }, { new: true })

            .then(dog => res.json(dog));
    });
    