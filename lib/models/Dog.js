const mongoose = require('mongoose');

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
    personalityAttributes: [{ String }],
    dogProvider: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    healthIssues: [ {} ]

})