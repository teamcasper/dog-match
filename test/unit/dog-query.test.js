const dogQuery = require('../../lib/util/dog-query');

describe('dog query', () => {
    it('creates a query for everything', () => {
        const query = {};
        expect(dogQuery(query)).toEqual({});
    });

    it('creates a query by breed', () => {
        const query = { breed: 'golden,husky,samoyed' };
        expect(dogQuery(query)).toEqual({ breed: ['golden', 'husky', 'samoyed'] });
    });

    describe('by age', () => {
        it('returns query for dogs in an age range', () => {
            const query = { minAge: '2', maxAge: '60' };
            expect(dogQuery(query)).toEqual({
                age: { $gte: 2, $lte: 60 }
            });
        });
        
        it('returns query for dogs with a max age only', () => {
            const query = { maxAge: '60' };
            expect(dogQuery(query)).toEqual({
                age: { $lte: 60 }
            });
        });

        it('returns query for dogs with a min age only', () => {
            const query = { minAge: '60' };
            expect(dogQuery(query)).toEqual({
                age: { $gte: 60 }
            });
        });
    });

    describe('by personality attributes', () => {
        it('returns a query for dogs with selected personality attributes', () => {
            const query = { personalityAttributes: 'loving,playful' };
            expect(dogQuery(query)).toEqual({ 
                personalityAttributes: { $in: ['loving', 'playful'] } 
            });
        });
    });


});
