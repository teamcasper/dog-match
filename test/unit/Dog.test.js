const { getErrors } = require('./helpers/getErrors');
const Dog = require('../../lib/models/Dog');

describe('Dog Model', () => {
    it('accepts a valid dog when passed', () => {
        const data = {
            name: 'Floof',
            description: 'Fluffy little friend',
            weightInLbs: 6,
            predictedWeight: 15,
            price: 500,
            photoUrl: 'https://i.pinimg.com/originals/a7/f7/73/a7f773018836201fb5e6d1e9a24049b8.jpg',
            age: {
                number: 6,
                unit: 'months'
            },
            spayedOrNeutered: true,
            personalityAttributes: ['loving', 'playful'],
            healthIssues: ['dental', 'vision'],
            healthRating: 4,
            healthDetails: 'Has a cavity, slight loss of vision in left eye'
        };

        const dog = new Dog(data);
        const jsonDog = dog.toJSON();
        expect(jsonDog).toEqual({ ...data, _id: expect.any(Object), breed: expect.any(Array)});
    });

    it('validates that required fields are included', () => {
        const dog = new Dog({
            name: 'Floof'
        });

        const errors = getErrors(dog.validateSync(), 5);
        expect(errors.description.properties.message).toEqual('Description is required.');
    });
});