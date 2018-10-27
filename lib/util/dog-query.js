module.exports = query => {
    let buildQuery = {};

    if(query.breed) {
        if(query.breedSearchType === 'or') {
            buildQuery.breed = { $in: query.breed.split(',') };
        }
    
        if(query.breedSearchType === 'and') {
            buildQuery.breed = { $all: query.breed.split(',') };
        }
    
        if(query.breedSearchType === 'not') {
            buildQuery.breed = { $nin: query.breed.split(',') };
        }
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
        if(query.personalityAttributesSearchType === 'or') {
            buildQuery.personalityAttributes = { $in: query.personalityAttributes.split(',') };
        }
    
        if(query.personalityAttributesSearchType === 'and') {
            buildQuery.personalityAttributes = { $all: query.personalityAttributes.split(',') };
        }
    
        if(query.personalityAttributesSearchType === 'not') {
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

    if(query.minWeight || query.maxWeight) {
        let weight = {};
        if(query.minWeight) {
            weight['$gte'] = parseInt(query.minWeight);
        }
    
        if(query.maxWeight) {
            weight['$lte'] = parseInt(query.maxWeight);  
        }

        buildQuery.weight = weight;
    }

    if(query.minPredictedWeight || query.maxPredictedWeight) {
        let predictedWeight = {};
        if(query.minPredictedWeight) {
            predictedWeight['$gte'] = parseInt(query.minPredictedWeight);
        }
    
        if(query.maxPredictedWeight) {
            predictedWeight['$lte'] = parseInt(query.maxPredictedWeight);  
        }

        buildQuery.predictedWeight = predictedWeight;
    }

    if(query.minPrice || query.maxPrice) {
        let price = {};
        if(query.minPrice) {
            price['$gte'] = parseInt(query.minPrice);
        }
    
        if(query.maxPrice) {
            price['$lte'] = parseInt(query.maxPrice);  
        }

        buildQuery.price = price;
    }

    if(query.spayedOrNeutered) {
        if(query.spayedOrNeutered === 'true'){
            buildQuery.spayedOrNeutered = true;
        }
        if(query.spayedOrNeutered === 'false') {
            buildQuery.spayedOrNeutered = false;
        }
            
    }
    //console.log('query', query)
    if(query.gender) {
        buildQuery.gender = query.gender;
    }

    return buildQuery;
};
