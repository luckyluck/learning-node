const request = require('request');

const constants = require('../../constants');

const getWeather = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/${constants.DARK_SKY_KEY}/${latitude},${longitude}`,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            } else {
                reject('Unable to fetch weather.');
            }
        });
    });
};

module.exports = {
    getWeather
};