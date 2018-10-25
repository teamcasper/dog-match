module.exports = query => {
    
    let buildQuery = {};
    
    if(query.hypoallergenic === true || query.hypoallergenic === false){
        buildQuery.hypoallergenic = query.hypoallergenic;
    }
    
    if(query.shedFactor === true || query.shedFactor === false){
        buildQuery.shedFactor = query.shedFactor;
    }

    if(query.types) {
        if(query.coatSearchType === 'including') {
            buildQuery.types = { $all: query.types.split(', ') };
        }
        if(query.coatSearchType === 'or') {
            buildQuery.types = { $in: query.types.split(', ') };
        }

    }
    return buildQuery;
};


