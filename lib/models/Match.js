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

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
