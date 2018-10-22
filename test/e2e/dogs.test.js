const { dropCollection } = require('./helpers/db');
const request = require('supertest');
const app = require('../../lib/app');
const { getDogs } = require('./helpers/seedData');

describe('end to end tests of Dogs route', () => {

    it('posts a dog', () => {
        return request(app)
            .post('/api/dogs')
            .send({
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
                healthDetails: 'Has a cavity, slight loss of vision in left eye'
            })
            .then(res => {
                expect(res.body).toEqual({
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
                    healthDetails: 'Has a cavity, slight loss of vision in left eye'
                })
            })
    });

    // it('gets all users', () => {
    //     const createdUsers = getUsers();

    //     return request(app)
    //         .get('/api/users')
    //         .then(res => {
    //             expect(res.body).toContainEqual(createdUsers[0]);
    //             expect(res.body).toContainEqual(createdUsers[1]);
    //             expect(res.body).toContainEqual(createdUsers[2]);
    //         });
    // });
});