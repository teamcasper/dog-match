require('dotenv').config();
const zipCityApi = require('../../lib/util/zip-city-api');

describe('Zip code by location', () => {

    it('Returns a city location when supplied with a valid zip code', done => {

        return zipCityApi('97220')
            .then(zipCode => {
                expect(zipCode).toEqual('Portland');
                done();
            });
    });
});
