const { getErrors } = require('../helpers/getErrors');
const User = require('../../../lib/models/User');

describe('User Model', () => {
    it('accepts a valid user when passed', () => {
        const data = {
            fullName: 'Douglas Fir',
            preferredName: 'Doug',
            email: 'dfir@gmail.com',
            role: 'dog-seeker',
            preferredContact: {
                text: 5035554444,
                comments: 'Nights and weekends are best'
            },
            address: {
                city: 'Portland',
                state: 'OR',
                zip: 97205
            }
        };

        const user = new User(data);
        const jsonUser = user.toJSON();
        expect(jsonUser).toEqual({ ...data, _id: expect.any(Object) });
    });

    it('validates that required fields are included', () => {
        const user = new User({
            preferredName: 'Doug'
        });

        const errors = getErrors(user.validateSync(), 4);
        expect(errors.fullName.properties.message).toEqual('Name is required.');
    });
});
