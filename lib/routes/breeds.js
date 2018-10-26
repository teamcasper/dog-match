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

        const breedQuery = req.query;
        
        Breed.find(breedQuery) 
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
    })

    .delete('/:id', (req, res, next) => {
        const { id } = req.params;

        Breed
            .findByIdAndDelete(id)
            .then(results => res.json({ removed: !!results }))
            .catch(next);
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const { 
            name, 
            weightRange, 
            lifespan, 
            temperament, 
            coatTypes, 
            hypoallergenic, 
            shed 
        } = req.body;

        Breed.replaceOne(
            { _id: id }, 
            { _id: id, name, 
                weightRange, 
                lifespan, 
                temperament, 
                coatTypes, 
                hypoallergenic, 
                shed 
            })
            .lean()
            .then(confirm => {
                if(confirm.ok) res.json({
                    _id: id, 
                    name: name, 
                    weightRange: weightRange,
                    lifespan: lifespan, 
                    temperament: temperament, 
                    coatTypes: coatTypes, 
                    hypoallergenic: hypoallergenic, 
                    shed: shed
                });
            });
        
    });


