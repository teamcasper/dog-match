module.exports = query => {
    let buildQuery = {};

    if(query.breed) {
        buildQuery.breed = query.breed.split(',');
    }

    if(query.minAge || query.maxAge) {
        let age = {};
        if(query.minAge) {
            age['$gte'] = parseInt(query.minAge);
        }
    
        if(query.maxAge) {
            age['$lte'] = parseInt(query.maxAge);  
        }

        buildQuery.age = age;
    }

    return buildQuery;
};
