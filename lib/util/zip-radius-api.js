const request = require('superagent');
const apiKey = process.env.RADIUS_API_KEY;

if(!apiKey) {
    console.log('No API key present!');
    process.exit(1);
}

const getRadius = (zip, radius) => `https://www.zipcodeapi.com/rest/${apiKey}/radius.json/${zip}/${radius}/mile`;

// TEST:  97220 returns ['97292', '97216','97213','97299','97220','97230','97238','97218']
function processZipCodes(data) {
    return data.zip_codes.map(element => element.zip_code);
}

const get = url => request.get(url).then(res => res.body);

module.exports = function getZipCodesByRadius(zip, radius) {
    return get(getRadius(zip, radius))
        .then(processZipCodes);
};
