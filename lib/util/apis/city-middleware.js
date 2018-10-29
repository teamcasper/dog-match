const zipCityApi = require('./zip-city-api');
const { HttpError } = require('../errors');

module.exports = (req, res, next) => {

    const { zip, citySearch } = req.query;

    if(zip && citySearch) {
        zipCityApi(zip)
            .then(apiResponse => {
                req.body.city = apiResponse;
                next();
            });

    } else if(!zip && citySearch){
        const httpError = new HttpError({
            code: 400,
            message: 'Zip code is required'
        });
        next(httpError);
        
    } else {
        next();
    }        
};

