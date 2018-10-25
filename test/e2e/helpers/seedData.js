require('dotenv').config();
require('../../../lib/util/connect')();
const { dropCollection } = require('./db');
const request = require('supertest');
const app = require('../../../lib/app');

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

let token0 = null;
let token3 = null;
let token4  = null;
let createdUsers;
let createdMatches;
let createdBreeds;
let createdDogs0;
let createdDogs3;
let createdDogs4;

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
            zip: 97220
        },
        businessInfo: { 
            name: 'Oak Family Golden Retrievers',
            website: 'www.oakgoldens.com',
            type: 'breeder'
        },
        password: 'soak123'
    },
    {
        fullName: 'User[3] near User[1]',
        preferredName: 'Artie',
        email: 'artie@gmail.com',
        role: 'user',
        preferredContact: {
            text: 5035551111
        },
        address: {
            city: 'Portland',
            state: 'OR',
            zip: 97216
        },
        businessInfo: { 
            name: 'Portland Dogs',
            website: 'www.PortlandDogs.com',
            type: 'breeder'
        },
        password: 'mope123'
    },
    {
        fullName: 'User[4] far away!',
        preferredName: 'Okie',
        email: 'okie@gmail.com',
        role: 'user',
        preferredContact: {
            text: 5035551111
        },
        address: {
            city: 'Oklahoma City',
            state: 'OK',
            zip: 73132
        },
        businessInfo: { 
            name: 'OKC Dogs',
            website: 'www.OKCDogs.com',
            type: 'breeder'
        },
        password: 'okie123'
    }
];

let matches = [
    {
        datePosted: Date('May 1, 2018'),
        dateFulfilled: Date('June 1, 2018'),
        feePaid: 100.00
    },
    {
        datePosted: Date('Jan 15, 2017'),
        dateFulfilled: Date('March 1, 2017'),
        feePaid: 100.00
    },
    {
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

let dogs0 = [
    {
        name: 'Floof1',
        description: 'Fluffy little friend',
        weight: 6,
        predictedWeight: 15,
        price: 500,
        photoUrl: 'https://i.pinimg.com/originals/a7/f7/73/a7f773018836201fb5e6d1e9a24049b8.jpg',
        age: 6,
        spayedOrNeutered: true,
        personalityAttributes: ['loving', 'intelligent'],
        healthIssues: ['dental', 'vision'],
        healthRating: 2,
        healthDetails: 'Has a cavity, slight loss of vision in left eye',
        gender: 'female'
    },
    {
        name: 'Floof2',
        description: 'Fluffy little friend',
        weight: 15,
        predictedWeight: 15,
        price: 500,
        photoUrl: 'https://i.pinimg.com/originals/a7/f7/73/a7f773018836201fb5e6d1e9a24049b8.jpg',
        age: 31,
        spayedOrNeutered: true,
        personalityAttributes: ['loving', 'playful'],
        healthIssues: ['dental', 'vision'],
        healthRating: 4,
        healthDetails: 'Has a cavity, slight loss of vision in left eye',
        gender: 'female'
    },
    {
        name: 'Floof3',
        description: 'Fluffy little friend',
        weight: 6,
        predictedWeight: 15,
        price: 500,
        photoUrl: 'https://i.pinimg.com/originals/a7/f7/73/a7f773018836201fb5e6d1e9a24049b8.jpg',
        age: 61,
        spayedOrNeutered: true,
        personalityAttributes: ['calm', 'playful'],
        healthIssues: ['dental', 'vision'],
        healthRating: 5,
        healthDetails: 'Has a cavity, slight loss of vision in left eye',
        gender: 'male'
    }
];

let dogs3 = [
    {
        name: 'Floof4 dogs[3]',
        description: 'Fluffy little friend',
        weight: 6,
        predictedWeight: 15,
        price: 500,
        photoUrl: 'https://i.pinimg.com/originals/a7/f7/73/a7f773018836201fb5e6d1e9a24049b8.jpg',
        age: 23,
        spayedOrNeutered: true,
        personalityAttributes: ['loving', 'playful'],
        healthIssues: ['dental', 'vision'],
        healthRating: 5,
        healthDetails: 'Has a cavity, slight loss of vision in left eye',
        gender: 'female'
    },
    {
        name: 'Floof5 dogs[4]',
        description: 'Fluffy little friend',
        weight: 6,
        predictedWeight: 15,
        price: 500,
        photoUrl: 'https://i.pinimg.com/originals/a7/f7/73/a7f773018836201fb5e6d1e9a24049b8.jpg',
        age: 90,
        spayedOrNeutered: true,
        personalityAttributes: ['loving', 'playful'],
        healthIssues: ['dental', 'vision'],
        healthRating: 2,
        healthDetails: 'Has a cavity, slight loss of vision in left eye',
        gender: 'other'
    }
];

let dogs4 = [
    {
        name: 'Dog owned by user 4 in OKC',
        description: 'Fluffy little friend',
        weight: 6,
        predictedWeight: 15,
        price: 500,
        photoUrl: 'https://i.pinimg.com/originals/a7/f7/73/a7f773018836201fb5e6d1e9a24049b8.jpg',
        age: 57,
        spayedOrNeutered: true,
        personalityAttributes: ['loving', 'playful'],
        healthIssues: ['dental', 'vision'],
        healthRating: 5,
        healthDetails: 'Has a cavity, slight loss of vision in left eye',
        gender: 'other'
    }
];

let dogs4 = [
    {
        name: 'Dog owned by user 4 in OKC',
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
        gender: 'female'
    }
];

const createUser = user => {
    return request(app)
        .post('/api/users')
        .send(user)
        .then(res => res.body);
};

const createMatch = match => {
    let token = getToken0();
    return request(app)
        .post('/api/matches')
        .set('Authorization', `Bearer ${token}`)
        .send(match)
        .then(res => res.body);
};

const createBreed = breed => {
    return request(app)
        .post('/api/breeds')
        .send(breed)
        .then(res => res.body);
};

const createDog0 = dog => {
    let token = getToken0();
    return request(app)
        .post('/api/dogs')
        .set('Authorization', `Bearer ${token}`)
        .send(dog)
        .then(res => res.body);
};

const createDog3 = dog => {
    let token = getToken3();
    return request(app)
        .post('/api/dogs')
        .set('Authorization', `Bearer ${token}`)
        .send(dog)
        .then(res => res.body);
};

const createDog4 = dog => {
    let token = getToken4();
    return request(app)
        .post('/api/dogs')
        .set('Authorization', `Bearer ${token}`)
        .send(dog)
        .then(res => res.body);
};

beforeEach(() => {
    return Promise.all(users.map(createUser)).then(usersRes => {
        createdUsers = usersRes;
    });
});

beforeEach(() => {
    return Promise.resolve(
        request(app)
            .post('/api/users/signin')
            .send({ email: 'dfir@gmail.com', password: 'dfir123' }))
        .then(res => {
            token0 = res.body.token;
        });
});

beforeEach(() => {
    return Promise.resolve(
        request(app)
            .post('/api/users/signin')
            .send({ email: 'artie@gmail.com', password: 'mope123' }))
        .then(res => {
            token3 = res.body.token;
        });
});

beforeEach(() => {
    return Promise.resolve(
        request(app)
            .post('/api/users/signin')
            .send({ email: 'okie@gmail.com', password: 'okie123' }))
        .then(res => {
            token4 = res.body.token;
        });
});
  
beforeEach(() => {
    return Promise.all(breeds.map(createBreed)).then(breedRes => {
        createdBreeds = breedRes;
    });
});

beforeEach(() => {
    dogs0[0].breed = [createdBreeds[0]._id];
    dogs0[1].breed = [createdBreeds[1]._id];
    dogs0[2].breed = [createdBreeds[2]._id];
   
    return Promise.all(dogs0.map(createDog0)).then(dogsRes => {
        createdDogs0 = dogsRes;
    });
});

beforeEach(() => {

    dogs3[0].breed = [createdBreeds[0]._id];
    dogs3[1].breed = [createdBreeds[1]._id];

    return Promise.all(dogs3.map(createDog3)).then(dogsRes => {
        createdDogs3 = dogsRes;
    });
});

beforeEach(() => {

    dogs4[0].breed = [createdBreeds[0]._id];

    return Promise.all(dogs4.map(createDog4)).then(dogsRes => {
        createdDogs4 = dogsRes;
    });
});

beforeEach(() => {
    return Promise.all(matches.map(createMatch)).then(matchesRes => {
        createdMatches = matchesRes;

        matches[0].seeker = createdUsers[0]._id;
        matches[0].provider = createdUsers[1]._id;
        matches[0].dog = createdDogs0[0]._id;

        matches[1].seeker = createdUsers[0]._id;
        matches[1].provider = createdUsers[2]._id;
        matches[1].dog = createdDogs0[1]._id;

        matches[2].seeker = createdUsers[1]._id;
        matches[2].provider = createdUsers[2]._id;
        matches[2].dog = createdDogs0[2]._id;
    });
});

const getUsers = () => createdUsers;
const getBreeds = () => createdBreeds;
const getDogs0 = () => createdDogs0;
const getDogs3 = () => createdDogs3;
const getDogs4 = () => createdDogs4;
const getMatches = () => createdMatches;
const getToken0 = () => token0;
const getToken3 = () => token3;
const getToken4 = () => token4;

module.exports = {
    getUsers,
    getBreeds,
    getDogs0,
    getDogs3,
    getDogs4,
    getMatches,
    getToken0,
    getToken3,
    getToken4
};
