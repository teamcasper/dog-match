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
        const req = { query: { zip: '97220', radius: 3 } } ;
        req.body = {};

        const next = () => {
            expect(req.body.zipCodes).toEqual([
                '97292',
                '97216',
                '97213',
                '97299',
                '97220',
                '97230',
                '97238',
                '97218'
            ]);
            done();
        };

        getZipCodeData(req, null, next);
    });
});
