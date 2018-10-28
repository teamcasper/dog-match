const mongoose = require('mongoose');
const { hash, compare } = require('../util/auth/hashing');
const { tokenize, untokenize } = require('../util/auth/tokenizer');
const { getStates } = require('./helpers/listHelper');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required.']
    },
    preferredName: String,
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    role: {
        type: String,
        required: [true, 'Role must be admin or user'],
        enum: ['admin', 'user']
    },
    preferredContact: {
        email: String,
        phone: Number,
        text: Number,
        comments: String
    },
    address: {
        city: String,
        state: {
            type: String,
            enum: getStates()    
        },
        zip: {
            type: Number,
            required: [true, 'ZIP code is required'],
        }
    },
    businessInfo: { 
        name: String,
        website: String,
        type: {
            type: String,
            enum: ['breeder', 'store', 'adoption'],
        }
    },
    passwordHash: String
}, {
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;
        }
    }
});

userSchema.virtual('password').set(function(password) {
    this._tempPassword = password;
});

userSchema.pre('save', function(next) {
    this.passwordHash = hash(this._tempPassword);
    next();
});

userSchema.methods.compare = function(password) {
    return compare(password, this.passwordHash);
};

userSchema.methods.authToken = function() {
    const jsonUser = this.toJSON();
    return tokenize(jsonUser);
};

userSchema.statics.findByToken = function(token) {
    try {
        const user = untokenize(token);
        return Promise.resolve(user);
    } catch(e) {
        return Promise.resolve(null);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
