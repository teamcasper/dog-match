const zipApi = require('../../lib/util/zip-api');

describe('test zip-api', () => {

    it('returns an array of zip codes', () => {
        return zipApi('97229', 5)
            .then(zipCodes => {
                expect(zipCodes).toEqual([
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
            });
    });
});
