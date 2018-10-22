const mongoose = require('mongoose');

const breedSchema = new mongoose.Schema({
    breed: {
        type: String,
        required: [true, 'breed is required.'],
    },
    weightRange: {
        type: String,
        enum: [
            '1 to 10 lbs', 
            '11 to 20 lbs', 
            '21 to 30 lbs', 
            '31 to 40 lbs', 
            '41 to 50 lbs',
            '51 to 60 lbs',
            '61 to 70 lbs',
            '71 to 80 lbs',
            '81 to 90 lbs',
            '91 to 100 lbs',
            '101 to 110 lbs',
            '111 to 120 lbs',
            '121 lbs +'
        ],
    },
    lifespan: {
        type: { type: Number, min: 1, max: 20 }
    },
    temperament: {
        type: String, 
        enum: ['friendly', '']
    },
    coatTypes: {
        type: String,
        enum: [
            'smooth',
            'double',
            'silky',
            'wool',
            'wire',
            'combination',
            'no hair'
        ],
    },
    hypoallergenic: Boolean,
    shed: Boolean,
});

const Breed = mongoose.model('Breed', breedSchema);

module.exports = Breed;

