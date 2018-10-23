const zipApi = require('../../lib/util/zip-api');

describe('blah', () => {

    it('', () => {
        return zipApi('97229', 5)
            .then(zipCodes => {
                expect(zipCodes).toEqual([]);
            });
    });

});
