const { 
    buildArrayType,
    buildMinMax,
    buildBoolean,
    buildIdentity,
    builder
} = require('./query-builder');

module.exports = query => {
    const queries = [
        { name: 'breed', fn: buildArrayType },
        { name: 'age', fn: buildMinMax },
        { name: 'personalityAttributes', fn: buildArrayType },
        { name: 'health', fn: buildMinMax, key: 'healthRating' },
        { name: 'weight', fn: buildMinMax },
        { name: 'predictedWeight', fn: buildMinMax },
        { name: 'price', fn: buildMinMax },
        { name: 'spayedOrNeutered', fn: buildBoolean },
        { name: 'gender', fn: buildIdentity }
    ];

    return builder(query, queries);
};
