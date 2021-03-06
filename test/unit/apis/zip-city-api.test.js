require('dotenv').config();
const zipCityApi = require('../../../lib/util/apis/zip-city-api');

describe('Zip code by location', () => {

    it('Returns a city when supplied with a valid zip code', done => {

        return zipCityApi('97220')
            .then(city => {
                expect(city).toEqual('Portland');
                done();
            });
    });
});
