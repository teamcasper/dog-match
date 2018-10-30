const {
    buildArrayType,
    buildBoolean,
    builder
} = require('./query-builder');

module.exports = query => {
    const queries = [
        { name: 'hypoallergenic', fn: buildBoolean },
        { name: 'shed', fn: buildBoolean },
        { name: 'coat', fn: buildArrayType, key: 'coatTypes' }
    ];

    return builder(query, queries);
};


