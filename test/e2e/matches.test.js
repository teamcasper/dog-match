/* eslint-disable-next-line */
const { dropCollection } = require('./helpers/db');
const request = require('supertest');
const app = require('../../lib/app');
const { getMatches, getToken0, getToken3 } = require('./helpers/seedData');

describe('matches routes', () => {

    it('posts a match if you are a signed in user', () => {
        const token = getToken0();

        const data = {
            feePaid: 125.25
        };

        return request(app)
            .post('/api/matches')
            .send(data)
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                const { __v, _id, datePosted, feePaid } = res.body;
                expect(__v).toBeDefined();
                expect(_id).toBeDefined();
                expect(datePosted).toBeDefined();
                expect(feePaid).toEqual(data.feePaid);
            });
    });

    it('will not allow you to post a match if you are not signed in', () => {
        const data = {
            feePaid: 125.25
        };

        return request(app)
            .post('/api/matches')
            .send(data)
            .then(res => {
                expect(res.body).toEqual({ error: 'Missing token' });            
            });
    });

    it('gets all matches', () => {
        const createdMatches = getMatches();

        return request(app)
            .get('/api/matches')
            .then(res => {
                expect(res.body).toContainEqual(createdMatches[0]);
                expect(res.body).toContainEqual(createdMatches[1]);
                expect(res.body).toContainEqual(createdMatches[2]);
            });
    });

    it('deletes a match by id if you are same user', () => {
        const token = getToken0();
        const createdMatches = getMatches();

        if(token) {
            return request(app)
                .delete(`/api/matches/${createdMatches[1]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .then(() => request(app).get('/api/matches'))
                .then(res => {
                    expect(res.body).not.toContainEqual(createdMatches[1]);
                    expect(res.body).toContainEqual(createdMatches[0]);
                    expect(res.body).toContainEqual(createdMatches[2]);
                });
        }

    });

    it('will not delete a match by id if user is not seeker', () => {
        const token = getToken3();
        const createdMatches = getMatches();

        if(token) {
            return request(app)
                .delete(`/api/matches/${createdMatches[1]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    expect(res.body).toEqual({ error: 'You are not authorized to make this change' });            
                });
        }

    });

    it('updates a match by id if you are same user', () => {
        const token = getToken0();
        const createdMatches = getMatches();
        let data = createdMatches[1];
        data.feePaid = 1000;

        if(token) {
            return request(app)
                .put(`/api/matches/${createdMatches[1]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .then(res => {
                    expect(res.body).toEqual(data);            
                });
        }
        
    });

    it('will not update a match by id if user is not seeker', () => {
        const token = getToken3();
        const createdMatches = getMatches();
        let data = createdMatches[1];
        data.feePaid = 1000;

        if(token) {
            return request(app)
                .put(`/api/matches/${createdMatches[1]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .then(res => {
                    expect(res.body).toEqual({ error: 'You are not authorized to make this change' });            
                });
        }
        
    });
});
