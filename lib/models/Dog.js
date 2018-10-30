const mongoose = require('mongoose');
const { getTraits, getHealthIssues } = require('./helpers/listHelper');
const { cityAggregate, zipAggregate } = require('./dog-aggregates');

const dogSchema = new mongoose.Schema({
    name: String,
    breed: [String],
    description: {
        type: String,
        required: [true, 'Description is required.']
    },
    weight: {
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
    ageInMonths: Number,
    spayedOrNeutered: {
        type: Boolean,
        required: [true, 'Spayed or neutered response is required.']
    },
    personalityAttributes: [{
        type: String,
        enum: getTraits()
    }],
    dogProvider: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, 'Dog Provider is required.']
    },
    healthIssues: [{
        type: String,
        enum: getHealthIssues()
    }],
    healthRating: {
        type: Number,
        min: 1,
        max: 5
    },
    healthDetails: String,
    gender: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    }
});

dogSchema.statics.avgPriceByZip = function() {
    return this.aggregate(zipAggregate);
};

dogSchema.statics.avgPriceByCity = function() {
    return this.aggregate(cityAggregate);
};

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
