const request = require('request');

const constants = require('../../constants');
/** GEO_API_KEY - it's your API key which you can generate in the developer's account following this instruction:
 * 1. Visit the url above: https://console.developers.google.com/apis/credentials?project=_
 * 2. Create a new project (you'll need to create or sign in to a Google account)
 * 3. Visit "library" in the sidebar
 * 4. Search for "Google Maps Geocoding API" and click "Enable"
 * 5. This will bring you over to the library dashboard where you'll need to click "Create credential" (screenshot).
 * 6. Then click "What credential do I need?" (screenshot). That'll spit out an API key. This is what you need.
 * 7. Change the request URL by adding a "key" query string. That would be something like the following. Note I've added "&" to separate the key value pairs.
 * They new key value pair is "key" for the key and the API Key from Google for the value.
 * https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+st+philadelphia&key=YOURKEYHERE
 * 8. Everything should work.
 * or you can simply remove &key=${constants.GEO_API_KEY} and use URL with limit on requests per day
 */

const geocodeAddress = address => {
    const encodedAddress = encodeURIComponent(address);

    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${constants.GEO_API_KEY}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

module.exports = {
    geocodeAddress
};