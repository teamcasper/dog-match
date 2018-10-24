require('dotenv').config();
const zipApi = require('../../lib/util/zip-radius-api');

describe('test zip-api', () => {

    it('returns an array of zip codes', () => {
        return zipApi('97220', 3)
            .then(zipCodes => {
                expect(zipCodes).toEqual([
                    '97292',
                    '97216',
                    '97213',
                    '97299',
                    '97220',
                    '97230',
                    '97238',
                    '97218'
                ]);
            });
    });
});
