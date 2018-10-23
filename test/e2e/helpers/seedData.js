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

beforeEach(() => {
    return dropCollection('breeds');
});

beforeEach(() => {
    return dropCollection('matches');
});

beforeEach(() => {
    return dropCollection('breeds');
});

let createdUsers;
let createdMatches;
let createdBreeds;
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

let breeds = [
    {
        name: 'Samoyed',
        weightRange: '41 to 50 lbs',
        lifespan: 15,
        temperament: ['energetic', 'friendly'],
        coatTypes: 'Smooth',
        hypoallergenic: true,
        shed: true
    },
    {
        name: 'German shepherd',
        weightRange: '61 to 70 lbs',
        lifespan: 14,
        temperament: ['herder', 'protective'],
        coatTypes: 'Smooth',
        hypoallergenic: false,
        shed: true
    },
    {
        name: 'Yorky',
        weightRange: '1 to 10 lbs',
        lifespan: 13,
        temperament: ['headstrong', 'independent'],
        coatTypes: 'Silky',
        hypoallergenic: true,
        shed: false
    }
];

let dogs = [
    {
        name: 'Floof1',
        description: 'Fluffy little friend',
        weight: 6,
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
        weight: 6,
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
        weight: 6,
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

const createMatch = match => {
    return request(app)
        .post('/api/matches')
        .send(match)
        .then(res => res.body);
};

const createBreed = breed => {
    return request(app)
        .post('/api/breeds')
        .send(breed)
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
    return Promise.all(breeds.map(createBreed)).then(breedRes => {
        createdBreeds = breedRes;
    });
});

beforeEach(() => {
    return Promise.all(dogs.map(createDog)).then(dogsRes => {
        createdDogs = dogsRes;
        dogs[0].dogProvider = createdUsers[1]._id;
        dogs[1].dogProvider = createdUsers[2]._id;
        dogs[2].dogProvider = createdUsers[2]._id;
        dogs[0].breed = [createdBreeds[0]._id];
        dogs[1].breed = [createdBreeds[1]._id];
        dogs[2].breed = [createdBreeds[2]._id];
    });
});

beforeEach(() => {
    return Promise.all(matches.map(createMatch)).then(matchesRes => {
        createdMatches = matchesRes;

        matches[0].seeker = createdUsers[0]._id;
        matches[0].provider = createdUsers[1]._id;
        matches[0].dog = createdDogs[0]._id;

        matches[1].seeker = createdUsers[0]._id;
        matches[1].provider = createdUsers[2]._id;
        matches[1].dog = createdDogs[1]._id;

        matches[2].seeker = createdUsers[1]._id;
        matches[2].provider = createdUsers[2]._id;
        matches[2].dog = createdDogs[2]._id;
    });
});

const getUsers = () => createdUsers;
const getBreeds = () => createdBreeds;
const getDogs = () => createdDogs;
const getMatches = () => createdMatches;
const getToken = () => {
    return Promise.resolve(
        request(app)
            .post('/api/users/signin')
            .send({ email: 'dfir@gmail.com', password: 'dfir123' }))
        .then(res => res.body.token);
};

module.exports = {
    getUsers,
    getBreeds,
    getDogs,
    getMatches,
    getToken
};
