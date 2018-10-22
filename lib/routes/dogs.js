const router = require('express').Router();
const Dog = require('../models/Dog');

module.exports = router
    .post('/', (req, res) => {
        const {
            name,
            breed,
            description,
            weightInLbs,
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
            weightInLbs,
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

    // .get('/', (req, res) => {
    //     User.find()
    //         .then(users => res.json(users));
    // });