module.exports = (req) => {

    if(req.query.zip && req.query.radius) {
        return { 'address.zip': req.body.zipCodes };
    } else if(req.query.zip && req.query.citySearch) {
        return { 'address.city': req.body.city };
    } else if(req.query.zip) {
        return { 'address.zip': req.query.zip };
    } else {
        return null;
    }

};
