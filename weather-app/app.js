const request = require('request');

const constants = require('../constants');

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia&key=${constants.GEO_API_KEY}`,
    json: true
}, (error, response, body) => {
    console.log(body);
});