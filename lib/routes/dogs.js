const router = require('express').Router();
const Dog = require('../models/Dog');
const User = require('../models/User');
const radiusMiddleware = require('../util/radius-middleware');
const cityMiddleware = require('../util/city-middleware');

const getUserQuery = req => {
    if(req.query.zip && req.query.radius) {
        User.find({ 'address.zip': req.body.zipCodes })
            .then(users => {
                Dog.find({ dogProvider: users._id });
            })
            .catch(next);
    }
    if(req.query.zip && req.query.citySearch) {
        console.log('  yoyoyoyo', req.body.city)
        User.find({ 'address.city': req.body.city })
            .then(users => {
                return Dog.find({ dogProvider: users._id })
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
};


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


    .get('/', radiusMiddleware, cityMiddleware, (req, res, next) => {
        
        
        Dog.find()
            .then(dogs => res.json(dogs))
            .catch(next);
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
