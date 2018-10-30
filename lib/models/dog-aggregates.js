const lookupUser = {
    $lookup: {
        from: 'users',
        localField: 'dogProvider',
        foreignField: '_id',
        as: 'owner'
    }
};

const unwindOwner = { $unwind: '$owner' };

const ownerGroupByAvg = modifier => ({
    $group: {
        _id: `$owner.address.${modifier}`,
        total: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
    }
});

const cityAggregate = [
    lookupUser,
    unwindOwner,
    ownerGroupByAvg('city')
];

const zipAggregate = [
    lookupUser,
    unwindOwner,
    ownerGroupByAvg('zip')
];

module.exports = {
    cityAggregate,
    zipAggregate
};
