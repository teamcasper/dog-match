const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    seeker: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    dog: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Dog'
    },
    datePosted: {
        type: Date,
        default: Date.now()
    },
    dateFulfilled: Date,
    feePaid: Number
});

matchSchema.statics.successfulMatches = function() {
    return this.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'seeker',
                foreignField: '_id',
                as: 'seeker',
            }
        }, 
        {
            $lookup: {
                from: 'users',
                localField: 'provider',
                foreignField: '_id',
                as: 'provider'
            }
        },
        {
            $lookup: {
                from: 'dogs',
                localField: 'dog',
                foreignField: '_id',
                as: 'dog'
            }
        },
        { $unwind: '$dog' },
        { $unwind: '$seeker' },
        { $unwind: '$provider' },
        { 
            $match: { dateFulfilled: { $ne: null } }
        },
        {
            $project: {
                provider: '$provider.fullName',
                adopter: '$seeker.fullName',
                dog: '$dog.name',
                dateOfAdoption: '$dateFulfilled',
                newHomeCity: '$seeker.address.city',
                newHomeState: '$seeker.address.state'  
            }
        } 
    ]);
};

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
