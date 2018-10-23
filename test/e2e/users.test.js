/* eslint-disable-next-line */
const { dropCollection } = require('./helpers/db');
const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');
const { getUsers } = require('./helpers/seedData');
const bcrypt = require('bcrypt');

const checkStatus = statusCode => res => {
    expect(res.status).toEqual(statusCode);
};

const checkOk = res => checkStatus(200)(res);

// const withToken = user => {
//     return request(app)
//         .post('/api/users/signin')
//         .send({ email: `${user.email}`, password: `${user.password}` })
//         .then(res => res.body.token);
// };

describe('end to end tests of Users route', () => {

    it('posts a user', () => {
        return request(app)
            .post('/api/users')
            .send({
                fullName: 'Douglas Fir',
                preferredName: 'Doug',
                email: 'dfir2@gmail.com',
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
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    fullName: 'Douglas Fir',
                    preferredName: 'Doug',
                    email: 'dfir2@gmail.com',
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
                    passwordHash: expect.any(String)
                });
            });
    });

    it('creates a user on signup', () => {
        return request(app)
            .post('/api/users/signup')
            .send({ 
                fullName: 'Douglas Fir',
                preferredName: 'Doug',
                email: 'dfir2@gmail.com',
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
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    fullName: 'Douglas Fir',
                    preferredName: 'Doug',
                    email: 'dfir2@gmail.com',
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
                    passwordHash: expect.any(String)
                });
            });
    });

    it('hashes a user\'s password', () => {
        return User.create({
            fullName: 'Douglas Fir',
            preferredName: 'Doug',
            email: 'dfir2@gmail.com',
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
        }).then(user => {
            expect(user.password).not.toEqual('dfir123');
            expect(bcrypt.compareSync('dfir123', user.passwordHash));
        });
    });

    it('compares passwords', () => {
        const user = {
            fullName: 'Douglas Fir',
            preferredName: 'Doug',
            email: 'dfir2@gmail.com',
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
        };
        
        User.create(user)
            .then(createdUser => {
                expect(createdUser.compare(user.password)).toBeTruthy();
                expect(createdUser.compare('543lkj')).toBeFalsy();
            });
    });

    it('signs in a user', () => {
        return request(app)
            .post('/api/users/signin')
            .send({ email: 'dfir@gmail.com', password: 'dfir123' })
            .then(res => {
                checkOk(res);
                expect(res.body.token).toEqual(expect.any(String));
            });
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

    it('gets a user by id', () => {
        const createdUsers = getUsers();

        return request(app)
            .get(`/api/users/${createdUsers[1]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdUsers[1]);
            });

    });

    it('deletes a user by id', () => {
        const createdUsers = getUsers();

        return request(app)
            .delete(`/api/users/${createdUsers[1]._id}`)
            .then(() => request(app).get('/api/users'))
            .then(res => {
                expect(res.body).not.toContainEqual(createdUsers[1]);
                expect(res.body).toContainEqual(createdUsers[0]);
                expect(res.body).toContainEqual(createdUsers[2]);
            });
    });

    it('updates a user by id', () => {
        const createdUsers = getUsers();

        return request(app)
            .put(`/api/users/${createdUsers[1]._id}`)
            .send({
                fullName: 'Willow Tree Revised',
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
                }            
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    fullName: 'Willow Tree Revised',
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
                    businessInfo: null,
                    passwordHash: expect.any(String)
                });            
            });
    });
});
