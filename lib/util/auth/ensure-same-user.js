const { HttpError } = require('../errors');

module.exports = ({ finder, context, key = 'user' }) => {
    return (req, res, next) => {
        const { user } = req;
        if(!user) {
            next(new HttpError({
                code: 401,
                message: 'User required'
            }));
            return;
        }
        else {
            const { id } = req.params;
            finder.call(context, { _id: id, [key]: req.user._id })
                .then(res => {
                    if(res) {
                        next();
                    } else {
                        next(new HttpError({
                            code: 401,
                            message: 'You are not authorized to make this change'
                        }));
                    }
                });
        }
    };
};
