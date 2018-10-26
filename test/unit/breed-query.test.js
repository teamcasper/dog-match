const breedQuery = require('../../lib/util/breed-query');

describe('Breed query test', () =>{

    it('creates a query for everything ', () => {
        const query = {};
        expect(breedQuery(query)).toEqual({});
    });

    describe('search by shed', () => {

        it('returns true when shed request is yes', () => {
            const query = { shed: true };
            expect(breedQuery(query)).toEqual(query);
        });

        it('returns false when shed request is no', () => {
            const query = { shed: false };
            expect(breedQuery(query)).toEqual(query);
        });
    });

    describe('by hypoallergenic breeds', () => {
        
        it('returns true when the hypoallergenic request is yes', () => {
            const query = { hypoallergenic: true };
            expect(breedQuery(query)).toEqual(query);
        });

        it('returns false when the hypoallergenic request is no', () => {
            const query = { hypoallergenic: false };
            expect(breedQuery(query)).toEqual(query);
        });
    });

    describe('by coatTypes', () => {
        
        it('returns a query for all coat types', () => {
            const query = {
                coatSearchType: 'including',
                types: 'Smooth, Double, Silky, Wool, Wire, Combination, No hair'
            };
            expect(breedQuery(query)).toEqual({
                coatTypes: { $all: [
                    'Smooth',
                    'Double',
                    'Silky',
                    'Wool',
                    'Wire',
                    'Combination',
                    'No hair'
                ] }
            });
        });

        it('returns a query for breeds with selected hair types', () => {
            const query = {
                coatSearchType: 'or',
                types: 'silky, smooth, double'
            };
            expect(breedQuery(query)).toEqual({
                coatTypes: { $in: ['silky', 'smooth', 'double'] }
            });
        });
    });
});
