/* eslint-disable-next-line */
const { dropCollection } = require('./helpers/db');
const request = require('supertest');
const app = require('../../lib/app');
const { getDogs, getUsers, getBreeds, getToken } = require('./helpers/seedData');

describe('end to end tests of Dogs route', () => {
    it('posts a dog', () => {
        const token = getToken();
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
                    dogProvider: createdUsers[2]._id,
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
                        dogProvider: createdUsers[2]._id
                    });
                });
        }    
    });
        
 

    it('gets all dogs', () => {
        const createdDogs = getDogs();

        return request(app)
            .get('/api/dogs')
            .then(res => {
                expect(res.body).toContainEqual(createdDogs[0]);
                expect(res.body).toContainEqual(createdDogs[1]);
                expect(res.body).toContainEqual(createdDogs[2]);
            });
    });

    it('gets a dog by id', () => {
        const createdDogs = getDogs();

        return request(app)
            .get(`/api/dogs/${createdDogs[1]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdDogs[1]);
            });

    });

    it('deletes a dog by id', () => {
        const createdDogs = getDogs();
        const token = getToken();
        if(token) {
            return request(app)
                .delete(`/api/dogs/${createdDogs[1]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .then(() => request(app).get('/api/dogs'))
                .then(res => {
                    expect(res.body).not.toContainEqual(createdDogs[1]);
                    expect(res.body).toContainEqual(createdDogs[0]);
                    expect(res.body).toContainEqual(createdDogs[2]);
                });
        }
    });

    it('updates a dog by id', () => {
        const createdUsers = getUsers();
        const createdDogs = getDogs();
        const token = getToken();

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
                    dogProvider: createdUsers[2]._id         
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
                        dogProvider: createdUsers[2]._id,
                        breed: null  
                    });            
                });
        }           
    });
});
