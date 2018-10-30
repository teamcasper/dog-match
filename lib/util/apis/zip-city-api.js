require('dotenv').config();
const request = require('superagent');
const apiKey = process.env.CITY_API_KEY;
const Cache = require('./cache');

if(!apiKey) {
    /* eslint-disable-next-line no-console */
    console.log('No API key present!');
    process.exit(1);
}

const cache = new Cache({
    97220: 'Portland',
    97205: 'Portland',
    97216: 'Portland',
    73132: 'Oklahoma City'
});

const getLocation = zip => `https://www.zipcodeapi.com/rest/${apiKey}/info.json/${zip}/degrees`;

function processLocationData(data) {
    return data.city;
}

const get = url => request.get(url).then(res => res.body);

module.exports = function getLocationByZipCode(zip) {
    const city = cache.get(zip);
    if(city) return Promise.resolve(city);

    return get(getLocation(zip))
        .then(processLocationData)
        .then(city => {
            cache.set(zip, city);
            return city;
        });
};





