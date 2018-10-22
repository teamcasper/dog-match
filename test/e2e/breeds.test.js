const { dropCollection } = require('./helpers/db');
const request = require('supertest');
const app = require('../../lib/app');
const { getBreeds } = require('./helpers/seedData');

describe('end to end test for breed routes', () => {

    it('posts a breed', () => {
        const breed = {
            name: 'Samoyed',
            weightRange: '41 to 50 lbs',
            lifespan: 15,
            temperament: ['energetic', 'friendly'],
            coatTypes: 'Smooth',
            hypoallergenic: true,
            shed: true
        };
        return request(app)
            .post('/api/breeds')
            .send(breed)
            .then(({ body }) => {
                expect(body).toEqual({
                    ...breed,
                    _id: expect.any(String),
                    __v: expect.any(Number)
                });
            });
    });



});
