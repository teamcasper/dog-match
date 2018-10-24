/* eslint-disable-next-line */
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
            .then(res => {
                expect(res.body).toEqual({
                    ...breed,
                    _id: expect.any(String),
                    __v: expect.any(Number)
                });
            });
    });

    it('gets all breeds', () => {
        const createdBreeds = getBreeds();

        return request(app)
            .get('/api/breeds')
            .then(res => {
                expect(res.body).toContainEqual(createdBreeds[0]);
                expect(res.body).toContainEqual(createdBreeds[1]);
                expect(res.body).toContainEqual(createdBreeds[2]);
            });
    });

    it('gets a breed by id', () => {
        const createdBreeds = getBreeds();
        return request(app)
            .get(`/api/breeds/${createdBreeds[0]._id}`)
            .then(res => {
                expect(res.body).toEqual({ ...createdBreeds[0] });
            });

    });

    it('deletes a breed by id', () => {
        const createdBreeds = getBreeds();
        
        return request(app)
            .delete(`/api/breeds/${createdBreeds[0]._id}`)
            .then(({ body }) => expect(body).toEqual({ removed: true }));
    });        

    it('updates a breed by id', () => {
        const createdBreeds = getBreeds();
        
        return request(app)
            .put(`/api/breeds/${createdBreeds[0]._id}`)
            .send({
                name: 'German sheppard',
                weightRange: '41 to 50 lbs',
                lifespan: 15,
                temperament: ['energetic', 'friendly'],
                coatTypes: 'Double',
                hypoallergenic: false,
                shed: true
            })
            .then(({ body }) => {
                expect(body).toEqual({
                    _id: expect.any(String),
                    name: 'German sheppard',
                    weightRange: '41 to 50 lbs',
                    lifespan: 15,
                    temperament: ['energetic', 'friendly'],
                    coatTypes: 'Double',
                    hypoallergenic: false,
                    shed: true
                });
            });
    });





});
