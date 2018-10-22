const router = require('express').Router();
const Breed = require('../models/Breed');

module.exports = router
    .post('/', (req, res, next) => {
        const {
            name,
            weightRange,
            lifespan,
            temperament,
            coatTypes,
            hypoallergenic,
            shed
        } = req.body;

        Breed.create({
            name,
            weightRange,
            lifespan,
            temperament,
            coatTypes,
            hypoallergenic,
            shed
        })
            .then((breed => res.json(breed)))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Breed.find()
            .then(breeds => res.json(breeds))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Breed
            .findById(id)
            .lean()
            .then(breed => res.json(breed))
            .catch(next);
    });


