const { dropCollection } = require('./helpers/db');
const request = require('supertest');
const app = require('../../lib/app');
const { Types } = require('mongoose');
const { getMatches } = require('./helpers/seedData');

describe('matches routes', () => {

    it('posts a match', () => {

        const data = {
            seeker: Types.ObjectId(),
            feePaid: 125.25
        };

        return request(app)
            .post('/api/matches')
            .send(data)
            .then(res => {
                const { __v, _id, datePosted, feePaid } = res.body;
                expect(__v).toBeDefined();
                expect(_id).toBeDefined();
                expect(datePosted).toBeDefined();
                expect(feePaid).toEqual(data.feePaid);
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

    it('deletes a match by id', () => {
        const createdMatches = getMatches();

        return request(app)
            .delete(`/api/matches/${createdMatches[1]._id}`)
            .then(() => request(app).get('/api/matches'))
            .then(res => {
                expect(res.body).not.toContainEqual(createdMatches[1]);
                expect(res.body).toContainEqual(createdMatches[0]);
                expect(res.body).toContainEqual(createdMatches[2]);
            });
    });

    // it('updates a match by id', () => {
    //     const createdMatches = getMatches();
    //     let data = createdMatches[1];
    //     data.feePaid = 1000;

    //     return request(app)
    //         .put(`/api/matches/${createdMatches[1]._id}`)
    //         .send({ data })
    //         .then(res => {
    //             expect(res.body).toEqual({ data });            
    //         }); 
    // });

});
