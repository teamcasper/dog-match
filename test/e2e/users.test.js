const { dropCollection } = require('./helpers/db');
const request = require('supertest');
const app = require('../../lib/app');
const { getUsers } = require('./helpers/seedData');

describe('end to end tests of Users route', () => {

    it('posts a user', () => {
        return request(app)
            .post('/api/users')
            .send({
                fullName: 'Douglas Fir',
                preferredName: 'Doug',
                email: 'dfir2@gmail.com',
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
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    fullName: 'Douglas Fir',
                    preferredName: 'Doug',
                    email: 'dfir2@gmail.com',
                    role: 'dog-seeker',
                    preferredContact: {
                        text: 5035554444,
                        comments: 'Nights and weekends are best'
                    },
                    address: {
                        city: 'Portland',
                        state: 'OR',
                        zip: 97205
                    }
                })
            })
    });

    it('gets all users', () => {
        const createdUsers = getUsers();

        return request(app)
            .get('/api/users')
            .then(res => {
                expect(res.body).toContainEqual(createdUsers[0]);
                expect(res.body).toContainEqual(createdUsers[1]);
                expect(res.body).toContainEqual(createdUsers[2]);
            });
    });
});