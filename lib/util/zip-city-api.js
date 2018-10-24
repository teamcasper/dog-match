require('dotenv').config();
const request = require('superagent');
const apiKey = process.env.CITY_API_KEY; 

if(!apiKey) {
    // eslint-disable-next-line no-console
    console.log('No API key present!');  
    process.exit(1);
}

// Setting up cache because the api is very stingy with the number of calls it allows
const cache = {
    97220: 'Portland'
};
const getCache = zip => {
    if(cache[zip]) return cache[zip];
    return null;
};
const setCache = (zip, city) => {
    cache[zip] = city;
};

const getLocation = zip => `https://www.zipcodeapi.com/rest/${apiKey}/info.json/${zip}/degrees`;
 
function processLocationData(data) {
    return data.city;
}

const get = url => request.get(url).then(res => res.body);

module.exports = function getLocationByZipCode(zip) {
    const city = getCache(zip);
    if(city) return Promise.resolve(city);

    return get(getLocation(zip))
        .then(processLocationData)
        .then(city => {
            setCache(zip, city);
            return city;
        });
};





