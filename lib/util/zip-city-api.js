require('dotenv').config();
const request = require('superagent');
const apiKey = process.env.CITY_API_KEY; 

if(!apiKey) {
    console.log('No API key present!');
    process.exit(1);
}

const getLocation = zip => `https://www.zipcodeapi.com/rest/${apiKey}/info.json/${zip}/degrees`;

function processLocationData(data) {
    return data.city;
}


const get = url => request.get(url).then(res => res.body);

module.exports = function getLocationByZipCode(zip) {
    return get(getLocation(zip))
        .then(processLocationData);
    // .then(apiResults => {
    //     return apiResults;
    // });
};





