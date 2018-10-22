const { getErrors } = require('./helpers/getErrors');
const Breed = require('../../lib/models/Breed');

describe('Breed model', () => {

    it('Validates a good model', () => {
        
        const data = {
            breed: 'Samoyed',
            weightRange: '41 to 50 lbs',
            lifespan: 15,
            temperament: [],
            coatTypes: 'Smooth',
            hypoallergenic: true,
            shed: true
        };

        const breed = new Breed(data);
        const jsonBreed = breed.toJSON();
        expect(jsonBreed).toEqual({ ...data, _id: expect.any(Object) });
    });

    





    // it('validates that required fields are included', () => {
    //     const breed = new Breed({
    //         preferredName: 'Doug'
    //     });

    //     const errors = getErrors(breed.validateSync(), 4);
    //     expect(errors.breed.properties.message).toEqual('breed is required.');
    // });

});
