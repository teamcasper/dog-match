
const zipCityApi = require('../../../lib/util/apis/city-middleware');

describe('Get zip code by location middleware test', () => {

    it('Returns an error if no zip code is supplied but citySearch is true', done => {
        const req = {
            query: { zip: '', citySearch: true }
        };

        let error;
        const next = err => {
            error = err;
            expect(error.code).toEqual(400);
            done();
        };

        zipCityApi(req, null, next);
    });

    it('Returns a city when provided with a zip code and citySearch is true', done => {
        const req = { query: { zip: '97220', citySearch: true } };
        req.body = {};

        const next = () => {
            expect(req.body.city).toEqual('Portland');
            done();
        };
        
        zipCityApi(req, null, next);
    });
});
