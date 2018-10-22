const mongoose = require('mongoose');
const { getTraits, getHealthIssues } = require('../util/listHelper');

const dogSchema = new mongoose.Schema({
    name: String,
    breed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Breed' }],
    description: {
        type: String,
        required: [true, 'Description is required.']
    },
    weightInLbs: {
        type: Number,
        required: [true, 'Weight in lbs is required.']
    },
    predictedWeight: Number,
    price: {
        type: Number,
        required: [true, 'Price is required.']
    },
    photoUrl: {
        type: String,
        required: [true, 'photoUrl is required.']
    },
    age: {
        number: Number,
        unit: {
            type: String,
            enum: ['month', 'months', 'years', 'year']
        }
    },
    spayedOrNeutered: {
        type: Boolean,
        required: [true, 'Spayed or neutered response is required.']
    },
    personalityAttributes: [{ 
        type: String,
        enum: getTraits() 
    }],
    dogProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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