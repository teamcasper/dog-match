const mongoose = require('mongoose');
const { getTraits, getHealthIssues } = require('../util/listHelper');

const dogSchema = new mongoose.Schema({
    name: String,
    breed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Breed' }],
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
    }
});

dogSchema.statics.avgPriceByZip = function() {
    return this.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'dogProvider',
                foreignField: '_id',
                as: 'owner'
            }
        },
        { $unwind: '$owner' },
        {
            $group: {
                _id: '$owner.address.zip',
                avgPrice: { $avg: '$price' }
            }
        }    
    ]);
};

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
