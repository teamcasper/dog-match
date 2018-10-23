const request = require('superagent');
const apiKey = '65NjiRfuv7nT4vH9iqwGnBIvgkckJoSwLDP8kLrDenh2Q4QNGjGaClMsOoWIPHd0'; // public key

const getRadius = (zip, radius) => `https://www.zipcodeapi.com/rest/${apiKey}/radius.json/${zip}/${radius}/mile`;

function processZipCodes(data) {
    return data.zip_codes.map(element => element.zip_code)
}


const get = url => request.get(url).then(res => res.body);

module.exports = function getZipCodesByRadius(zip, radius) {
    return get(getRadius(zip, radius))
        .then(processZipCodes);
};
