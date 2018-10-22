const mongoose = require('mongoose');
const { getTraits, getHealthIssues } = require('../util/listHelper');

const dogSchema = new mongoose.Schema({
    name: String,
    breed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Breed' }],
    description: String,
    weightInLbs: Number,
    predictedWeight: Number,
    price: Number,
    age: {
        number: Number,
        unit: {
            type: String,
            enum: ['month', 'months', 'years', 'year']
        }
    },
    spayedOrNeutered: Boolean,
    personalityAttributes: [{ 
        type: String,
        enum: getTraits() 
    }],
    dogProvider: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    healthIssues: [{ 
        type: String,
        enum: getHealthIssues() 
    }],
    healthRating: {
        type: Number,
        min: 1,
        max: 5
    },
    healthDetails: String
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;