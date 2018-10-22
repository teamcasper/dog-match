require('dotenv').config();
require('../../../lib/util/connect')();
const { dropCollection } = require('./db');
const request = require('supertest');
const app = require('../../../lib/app');
const { Types } = require('mongoose');

beforeEach(() => {
    return dropCollection('users');
});

let createdUsers;

let users = [
    {
        fullName: 'Douglas Fir',
        preferredName: 'Doug',
        email: 'dfir@gmail.com',
        role: 'dog-seeker',
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
        role: 'dog-seeker',
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
        role: 'dog-provider',
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

const createUser = user => {
    return request(app)
        .post('/api/users')
        .send(user)
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