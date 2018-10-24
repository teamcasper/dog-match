const dogQuery = require('../../lib/util/dog-query');

describe('dog query', () => {
    it('creates a query for everything', () => {
        const query = {};
        expect(dogQuery(query)).toEqual({});
    });
})