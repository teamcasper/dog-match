require('dotenv').config();
require('../../../lib/util/connect')();
const { dropCollection } = require('./db');
const request = require('supertest');
const app = require('../../../lib/app');
const { Types } = require('mongoose');

beforeEach(() => {
    return dropCollection('users');
});

beforeEach(() => {
    return dropCollection('matches');
});

let createdUsers;
let createdMatches;

let users = [
    {
        fullName: 'Douglas Fir',
        preferredName: 'Doug',
        email: 'dfir@gmail.com',
        role: 'user',
        preferredContact: {
            text: 5035554444,
            comments: 'Nights and weekends are best'
        },
        address: {
            city: 'Portland',
            state: 'OR',
            zip: 97205
        },
        password: 'dfir123'
    },
    {
        fullName: 'Willow Tree',
        preferredName: 'Willow',
        email: 'wtree@gmail.com',
        role: 'user',
        preferredContact: {
            text: 5035552222
        },
        address: {
            city: 'Portland',
            state: 'OR',
            zip: 97220
        },
        password: 'wtree123'
    },
    {
        fullName: 'Shady Oak',
        preferredName: 'Slim',
        email: 'soak@gmail.com',
        role: 'user',
        preferredContact: {
            text: 5035551111
        },
        address: {
            city: 'Portland',
            state: 'OR',
            zip: 97209
        },
        businessInfo: { 
            name: 'Oak Family Golden Retrievers',
            website: 'www.oakgoldens.com',
            type: 'breeder'
        },
        password: 'soak123'
    }
];

let matches = [
    {
        seeker:  Types.ObjectId(),
        provider: Types.ObjectId(),
        dog: Types.ObjectId(),
        datePosted: Date('May 1, 2018'),
        dateFulfilled: Date('June 1, 2018'),
        feePaid: 100.00
    },
    {
        seeker:  Types.ObjectId(),
        provider: Types.ObjectId(),
        dog: Types.ObjectId(),
        datePosted: Date('Jan 15, 2017'),
        dateFulfilled: Date('March 1, 2017'),
        feePaid: 100.00
    },
    {
        seeker:  Types.ObjectId(),
        provider: Types.ObjectId(),
        dog: Types.ObjectId(),
        datePosted: Date('April 4, 2017'),
    }
];

const createUser = user => {
    return request(app)
        .post('/api/users')
        .send(user)
        .then(res => res.body);
};

const createMatch = match => {
    return request(app)
        .post('/api/matches')
        .send(match)
        .then(res => res.body);
};

beforeEach(() => {
    return Promise.all(users.map(createUser)).then(usersRes => {
        createdUsers = usersRes;
    });
});

const getUsers = () => createdUsers;

module.exports = {
    getUsers
};
