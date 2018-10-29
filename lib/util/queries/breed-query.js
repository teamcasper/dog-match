module.exports = query => {
    
    let buildQuery = {};
    
    if(query.hypoallergenic === true || query.hypoallergenic === false){
        buildQuery.hypoallergenic = query.hypoallergenic;
    }
    
    if(query.shed === true || query.shed === false){
        buildQuery.shed = query.shed;
    }

    if(query.types) {
        if(query.coatSearchType === 'including') {
            buildQuery.coatTypes = { $all: query.types.split(', ') };
        }
        if(query.coatSearchType === 'or') {
            buildQuery.coatTypes = { $in: query.types.split(', ') };
        }

    }
    return buildQuery;
};


