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

    if(query.personalityAttributes) {
        if(query.searchType === 'or') {
            buildQuery.personalityAttributes = { $in: query.personalityAttributes.split(',') };
        }
    
        if(query.searchType === 'and') {
            buildQuery.personalityAttributes = { $all: query.personalityAttributes.split(',') };
        }
    
        if(query.searchType === 'not') {
            buildQuery.personalityAttributes = { $nin: query.personalityAttributes.split(',') };
        }
    }

    if(query.minHealth || query.maxHealth) {
        let healthRating = {};
        if(query.minHealth) {
            healthRating['$gte'] = parseInt(query.minHealth);
        }
    
        if(query.maxHealth) {
            healthRating['$lte'] = parseInt(query.maxHealth);  
        }

        buildQuery.healthRating = healthRating;
    }

    return buildQuery;
};
