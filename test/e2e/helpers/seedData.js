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
    return dropCollection('dogs');
});

let createdUsers;
let createdDogs;

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

let dogs = [
    {
        name: 'Floof1',
        description: 'Fluffy little friend',
        weightInLbs: 6,
        predictedWeight: 15,
        price: 500,
        photoUrl: 'https://i.pinimg.com/originals/a7/f7/73/a7f773018836201fb5e6d1e9a24049b8.jpg',
        age: {
            number: 6,
            unit: 'months'
        },
        spayedOrNeutered: true,
        personalityAttributes: ['loving', 'playful'],
        healthIssues: ['dental', 'vision'],
        healthRating: 4,
        healthDetails: 'Has a cavity, slight loss of vision in left eye',
        dogProvider: Types.ObjectId()
    },
    {
        name: 'Floof2',
        description: 'Fluffy little friend',
        weightInLbs: 6,
        predictedWeight: 15,
        price: 500,
        photoUrl: 'https://i.pinimg.com/originals/a7/f7/73/a7f773018836201fb5e6d1e9a24049b8.jpg',
        age: {
            number: 6,
            unit: 'months'
        },
        spayedOrNeutered: true,
        personalityAttributes: ['loving', 'playful'],
        healthIssues: ['dental', 'vision'],
        healthRating: 4,
        healthDetails: 'Has a cavity, slight loss of vision in left eye',
        dogProvider: Types.ObjectId()
    },
    {
        name: 'Floof3',
        description: 'Fluffy little friend',
        weightInLbs: 6,
        predictedWeight: 15,
        price: 500,
        photoUrl: 'https://i.pinimg.com/originals/a7/f7/73/a7f773018836201fb5e6d1e9a24049b8.jpg',
        age: {
            number: 6,
            unit: 'months'
        },
        spayedOrNeutered: true,
        personalityAttributes: ['loving', 'playful'],
        healthIssues: ['dental', 'vision'],
        healthRating: 4,
        healthDetails: 'Has a cavity, slight loss of vision in left eye',
        dogProvider: Types.ObjectId()
    },

];

const createUser = user => {
    return request(app)
        .post('/api/users')
        .send(user)
        .then(res => res.body);
};

const createDog = dog => {
    return request(app)
        .post('/api/dogs')
        .send(dog)
        .then(res => res.body);
};

beforeEach(() => {
    return Promise.all(users.map(createUser)).then(usersRes => {
        createdUsers = usersRes;
    });
});

beforeEach(() => {
    return Promise.all(dogs.map(createDog)).then(dogsRes => {
        createdDogs = dogsRes;
        dogs[0].dogProvider = createdUsers[2]._id;
        dogs[1].dogProvider = createdUsers[2]._id;
        dogs[2].dogProvider = createdUsers[2]._id;
    });
});

const getUsers = () => createdUsers;
const getDogs = () => createdDogs;

module.exports = {
    getUsers,
    getDogs
};