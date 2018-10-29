const { HttpError } = require('../errors');
const getZipCodesByRadius = require('./zip-radius-api');

module.exports = (req, res, next) => {

    const { zip, radius }  = req.query;

    if(zip && radius) {
        getZipCodesByRadius(zip, radius)
            .then(apiResponse => {
                req.body.zipCodes = apiResponse;
                next();
            });

    } else if(radius && !zip) {
        const error = new HttpError({
            code: 400,
            message: 'Bad request: Zip code and radius required'
        });
        next(error);
        
    } else {
        next();
    }

};
