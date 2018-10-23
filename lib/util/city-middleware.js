const zipCityApi = require('./zip-city-api');
const { HttpError } = require('./errors');

module.exports = (req, res, next) => {

    const { zip } = req.query;

    if(!zip) {
        const httpError = new HttpError({
            code: 400,
            message: 'Zip code is required'
        });
        return next(httpError);
    }

    zipCityApi(zip)
        .then(apiResponse => {
            req.body.city = apiResponse;
            next();
        });
};

