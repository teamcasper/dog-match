
const zipCityApi = require('../../lib/util/city-middleware');

describe('Get zip code by location middleware test', () => {

    it('Returns an error if no zipcode is supplied but citysearch is true', done => {
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

    it('Returns a city when provided with a zip code and citysearch is true', done => {
        const req = { query: { zip: '97124', citySearch: true } };
        req.body = {};

        const next = () => {
            expect(req.body.city).toEqual('Hillsboro');
        
            done();
        };
        zipCityApi(req, null, next);
    });
});
