const request = require('superagent');
const apiKey = process.env.RADIUS_API_KEY;

if(!apiKey) {
    /* eslint-disable-next-line no-console */
    console.log('No API key present!');
    process.exit(1);
}

// Setting up a cache of zips (always with a radius of 3) because the api is very stingy with the number of calls it allows
const cache = {
    972203: ['97292', '97216', '97213', '97299', '97220', '97230', '97238', '97218'],
    972053: ['97239', '97221', '97201', '97256', '97258', '97204', '97207', '97251', '97253', '97254', '97255', '97259', '97271', '97272', '97205', '97208', '97296', '97228', '97283', '97209', '97291', '97227', '97210'],
    972163: ['97286', '97206', '97266', '97292', '97216', '97215', '97233', '97213', '97220'],
    731323: ['73008', '73122', '73132', '73162']
};
const getCache = key => {
    if(cache[key]) return cache[key];
    return null;
};
const setCache = (key, zips) => {
    cache[key] = zips;
};

const getRadius = (zip, radius) => `https://www.zipcodeapi.com/rest/${apiKey}/radius.json/${zip}/${radius}/mile`;

function processZipCodes(data) {
    return data.zip_codes.map(element => element.zip_code);
}

const get = url => request.get(url).then(res => res.body);

module.exports = function getZipCodesByRadius(zip, radius) {
    const key = `${zip}${radius}`;
    const zips = getCache(key);
    if(zips) return Promise.resolve(zips);

    return get(getRadius(zip, radius))
        .then(processZipCodes)
        .then(zips => {
            setCache(key, zips);
            return zips;
        });
};
