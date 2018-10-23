const { HttpError } = require('./errors');
const getZipCodesByRadius = require('./zip-radius-api');

module.exports = (req, res, next) => {

    const { zip, radius }  = req.query;

    if(!zip || !radius) {
        const error = new HttpError({
            code: 400,
            message: 'Bad request: Zip code and radius required'
        });
        return next(error);
    }

    getZipCodesByRadius(zip, radius)
        .then(apiResponse => {
            req.body.zipCodes = apiResponse;
            next();
        });
};
