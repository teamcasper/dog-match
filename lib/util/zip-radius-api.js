const request = require('superagent');
const apiKey = process.env.RADIUS_API_KEY;

if(!apiKey) {
    console.log('No API key present!');
    process.exit(1);
}

// Setting up cache because the api is very stingy with the number of calls it allows
const cache = {
    97220: ['97292', '97216', '97213', '97299', '97220', '97230', '97238', '97218']
};
const getCache = zip => {
    if(cache[zip]) return cache[zip];
    return null;
};
const setCache = (zip, zips) => {
    cache[zip] = zips;
};

const getRadius = (zip, radius) => `https://www.zipcodeapi.com/rest/${apiKey}/radius.json/${zip}/${radius}/mile`;

function processZipCodes(data) {
    return data.zip_codes.map(element => element.zip_code);
}

const get = url => request.get(url).then(res => res.body);

module.exports = function getZipCodesByRadius(zip, radius) {
    const zips = getCache(zip);
    if(zips) return Promise.resolve(zips);

    return get(getRadius(zip, radius))
        .then(processZipCodes)
        .then(zips => {
            setCache(zip, zips);
            return zips;
        });
};
