require('dotenv').config();
const getZipCodeData = require('../../lib/util/radius-middleware');

describe('test the middleware that gets a radius of zip codes', () => {

    it('sends back an HttpError if radius is provided but not zip', done => {
        const req = { query: { radius: 5, zip: '' } } ;

        let error;
        const next = err => {
            error = err;
            expect(error.code).toEqual(400);
            done();
        };

        getZipCodeData(req, null, next);
    });

    it('returns a list of zip codes within a radius', done => {
        const req = { query: { zip: '97229', radius: 5 } } ;
        req.body = {};

        const next = () => {
            expect(req.body.zipCodes).toEqual([
                '97078',
                '97075',
                '97076',
                '97077',
                '97005',
                '97298',
                '97003',
                '97225',
                '97006',
                '97296',
                '97291',
                '97210',
                '97229']);
           
            done();
        };

        getZipCodeData(req, null, next);
    });
});
