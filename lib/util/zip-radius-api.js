const request = require('superagent');
const apiKey = process.env.RADIUS_API_KEY;

if(!apiKey) {
    console.log('No API key present!');
    process.exit(1);
}

const getRadius = (zip, radius) => `https://www.zipcodeapi.com/rest/${apiKey}/radius.json/${zip}/${radius}/mile`;

function processZipCodes(data) {
    return data.zip_codes.map(element => element.zip_code);
}

const get = url => request.get(url).then(res => res.body);

module.exports = function getZipCodesByRadius(zip, radius) {
    return get(getRadius(zip, radius))
        .then(processZipCodes);
};

