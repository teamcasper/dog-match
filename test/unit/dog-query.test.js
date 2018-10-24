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
        it('returns a query for dogs with any of the selected personality attributes', () => {
            const query = { 
                searchType: 'or',
                personalityAttributes: 'loving,playful' 
            };
            expect(dogQuery(query)).toEqual({ 
                personalityAttributes: { $in: ['loving', 'playful'] } 
            });
        });

        it('returns a query for dogs with all of the selected personality attributes', () => {
            const query = { 
                searchType: 'and',
                personalityAttributes: 'loving,playful' 
            };
            expect(dogQuery(query)).toEqual({ 
                personalityAttributes: { $all: ['loving', 'playful'] } 
            });
        });

        it('returns a query for dogs with none of the selected personality attributes', () => {
            const query = { 
                searchType: 'not',
                personalityAttributes: 'anxious,protective' 
            };
            expect(dogQuery(query)).toEqual({ 
                personalityAttributes: { $nin: ['anxious', 'protective'] } 
            });
        });
    });

    describe('by health rating', () => {
        it('returns query for dogs in a health rating range', () => {
            const query = { minHealth: '3', maxHealth: '4' };
            expect(dogQuery(query)).toEqual({
                healthRating: { $gte: 3, $lte: 4 }
            });
        });
        
        it('returns query for dogs with a max health only', () => {
            const query = { maxHealth: '4' };
            expect(dogQuery(query)).toEqual({
                healthRating: { $lte: 4 }
            });
        });

        it('returns query for dogs with a min health only', () => {
            const query = { minHealth: '4' };
            expect(dogQuery(query)).toEqual({
                healthRating: { $gte: 4 }
            });
        });
    });

    describe('by weight', () => {
        it('returns query for dogs in a weight range', () => {
            const query = { minWeight: 2, maxWeight: 20 };
            expect(dogQuery(query)).toEqual({
                weight: { $gte: 2, $lte: 20 }
            });
        });
        
        it('returns query for dogs with a max weight only', () => {
            const query = { maxWeight: 20 };
            expect(dogQuery(query)).toEqual({
                weight: { $lte: 20 }
            });
        });

        it('returns query for dogs with a min weight only', () => {
            const query = { minWeight: 2 };
            expect(dogQuery(query)).toEqual({
                weight: { $gte: 2 }
            });
        });
    });

    describe('by predicted weight', () => {
        it('returns query for dogs in a predicted weight range', () => {
            const query = { minPredictedWeight: 5, maxPredictedWeight: 20 };
            expect(dogQuery(query)).toEqual({
                predictedWeight: { $gte: 5, $lte: 20 }
            });
        });
        
        it('returns query for dogs with a max predicted weight only', () => {
            const query = { maxPredictedWeight: 20 };
            expect(dogQuery(query)).toEqual({
                predictedWeight: { $lte: 20 }
            });
        });

        it('returns query for dogs with a min predicted weight only', () => {
            const query = { minPredictedWeight: 5 };
            expect(dogQuery(query)).toEqual({
                predictedWeight: { $gte: 5 }
            });
        });
    });

    describe('by price', () => {
        it('returns query for dogs in a price range', () => {
            const query = { minPrice: 100, maxPrice: 500 };
            expect(dogQuery(query)).toEqual({
                price: { $gte: 100, $lte: 500 }
            });
        });
        
        it('returns query for dogs with a max price only', () => {
            const query = { maxPrice: 500 };
            expect(dogQuery(query)).toEqual({
                price: { $lte: 500 }
            });
        });

        it('returns query for dogs with a min price only', () => {
            const query = { minPrice: 100 };
            expect(dogQuery(query)).toEqual({
                price: { $gte: 100 }
            });
        });
    });
});
