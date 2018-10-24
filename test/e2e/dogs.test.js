/* eslint-disable-next-line */
const { dropCollection } = require('./helpers/db');
const request = require('supertest');
const app = require('../../lib/app');
const { getDogs0, getUsers, getBreeds, getToken0 } = require('./helpers/seedData');

describe('end to end tests of Dogs route', () => {
    it('posts a dog', () => {
        const token = getToken0();
        const createdUsers = getUsers();
        const createdBreeds = getBreeds(); 
        if(token) {
            return request(app)
                .post('/api/dogs')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Floof4',
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
                    breed: [createdBreeds[1]._id, createdBreeds[2]._id]
                })
                .then(res => {
                    expect(res.body).toEqual({
                        _id: expect.any(String),
                        __v: expect.any(Number),
                        breed: expect.any(Array),
                        name: 'Floof4',
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
                        dogProvider: createdUsers[0]._id
                    });
                });
        }    
    });
        
 

    it('gets all dogs', () => {
        const createdDogs = getDogs0();

        return request(app)
            .get('/api/dogs')
            .then(res => {
                expect(res.body).toContainEqual(createdDogs[0]);
                expect(res.body).toContainEqual(createdDogs[1]);
                expect(res.body).toContainEqual(createdDogs[2]);
            });
    });

    it.skip('gets all dogs for a radius around a zip code', () => {
        const createdDogs = getDogs0();
        return request(app)
            .get('/api/dogs?zip=97229&radius=5')
            .then(res => {
                expect(res.body).toContainEqual(createdDogs[3]);
                expect(res.body).toContainEqual(createdDogs[4]);
            });
    });

    it('gets all dogs in a zip code', () => {
        const createdDogs = getDogs0();
        return request(app)
            .get('/api/dogs?zip=97220')
            .then(res => {
                expect(res.body).toContainEqual(createdDogs[0]);
                expect(res.body).toContainEqual(createdDogs[1]);
                expect(res.body).toContainEqual(createdDogs[2]);
            });
    });

    it.skip('gets all dogs in a city by zip code', () => {
        const createdDogs = getDogs0();
        return request(app)
            .get('/api/dogs?zip=97220&citySearch=true')
            .then(res => {
                expect(res.body).toContainEqual(createdDogs[0]);
                expect(res.body).toContainEqual(createdDogs[1]);
                expect(res.body).toContainEqual(createdDogs[2]);
                expect(res.body).not.toContainEqual(createdDogs[3]);
                expect(res.body).not.toContainEqual(createdDogs[4]);
            });
    });

    it('gets a dog by id', () => {
        const createdDogs = getDogs0();

        return request(app)
            .get(`/api/dogs/${createdDogs[1]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdDogs[1]);
            });

    });

    it('deletes a dog by id', () => {
        const createdDogs = getDogs0();
        const token = getToken0();
        if(token) {
            return request(app)
                .delete(`/api/dogs/${createdDogs[0]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .then(() => request(app).get('/api/dogs')
                    .then(res => {
                        expect(res.body).not.toContainEqual(createdDogs[0]);
                        expect(res.body).toContainEqual(createdDogs[1]);
                        expect(res.body).toContainEqual(createdDogs[2]);
                    })
                );
           
        }
    });

    it('updates a dog by id', () => {
        const createdUsers = getUsers();
        const createdDogs = getDogs0();
        const token = getToken0();

        if(token) {
            return request(app)
                .put(`/api/dogs/${createdDogs[1]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Floof4',
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
                    healthIssues: ['dental'],
                    healthRating: 4,
                    healthDetails: 'Has a cavity',
                })
                .then(res => {
                    expect(res.body).toEqual({
                        _id: createdDogs[1]._id,
                        __v: expect.any(Number),
                        name: 'Floof4',
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
                        healthIssues: ['dental'],
                        healthRating: 4,
                        healthDetails: 'Has a cavity',
                        dogProvider: createdUsers[0]._id,
                        breed: null  
                    });            
                });
        }           
    });
});
