const mongoose = require('mongoose');
const { hash, compare } = require('../util/hashing');
const { tokenize, untokenize } = require('../util/tokenizer');

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
        required: [true, 'Role must be admin, dog-seeker or dog-provider'],
        enum: ['admin', 'dog-seeker', 'dog-provider']
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
            enum: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']
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
            enum: ['breeder, store, adoption agency'],
        }
    },
    passwordHash: String
}, {
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;
            delete ret.passwordHash;
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
