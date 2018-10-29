const mongoose = require('mongoose');
const { getWeightRanges, getCoatTypes } = require('./helpers/listHelper');

const breedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required.'],
    },
    weightRange: {
        type: String,
        enum: getWeightRanges(),
    },
    lifespan: { 
        type: Number, 
        min: 1, 
        max: 20 
    },
    temperament: {
        type: []
    },
    coatTypes: {
        type: String,
        enum: getCoatTypes(),
    },
    hypoallergenic: Boolean,
    shed: Boolean,
});

const Breed = mongoose.model('Breed', breedSchema);

module.exports = Breed;

