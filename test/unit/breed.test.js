const { getErrors } = require('./helpers/getErrors');
const Breed = require('../../lib/models/Breed');

describe('Breed model', () => {

    const data = {
        name: 'Samoyed',
        weightRange: '41 to 50 lbs',
        lifespan: 15,
        temperament: [],
        coatTypes: 'Smooth',
        hypoallergenic: true,
        shed: true
    };

    it('Validates a good model', () => {
        const breed = new Breed(data);
        const jsonBreed = breed.toJSON();
        expect(jsonBreed).toEqual({ ...data, _id: expect.any(Object) });
    });

    it('Validates all required fields have been filled out', () => {
        data.name = '';
        const breed = new Breed(data);
        const errors = getErrors(breed.validateSync(), 1);
        expect(errors.name.properties.message).toEqual('name is required.');
    });
});
