const { getErrors } = require('../helpers/getErrors');
const Match = require('../../../lib/models/Match');
const { Types } = require('mongoose');

describe('Match Model', () => {

    const data = {
        seeker: Types.ObjectId(),
        provider: Types.ObjectId(),
        dog: Types.ObjectId(),
        feePaid: 125.25
    };

    it('accepts a valid match', () => {
        const match = new Match(data);
        const jsonMatch = match.toJSON();
        expect(jsonMatch).toEqual({ 
            ...data, 
            datePosted: expect.any(Date),
            _id: expect.any(Object),
        });
    });

    it('validates that a seeker is required', () => {
        const match = new Match({});
        const errors = getErrors(match.validateSync(), 1);
        expect(errors.seeker.properties.message).toEqual('Path `seeker` is required.');
    });
});
