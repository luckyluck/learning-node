const yargs = require('yargs');
const axios = require('axios');

const constants = require('../constants');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${constants.GEO_API_KEY}`;

axios.get(geocodeUrl)
    .then(response => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        }

        console.log(response.data.results[0].formatted_address);

        const { lat, lng } = response.data.results[0].geometry.location;
        const weatherUrl = `https://api.darksky.net/forecast/${constants.DARK_SKY_KEY}/${lat},${lng}`;

        axios.get(weatherUrl)
            .then(response => {
                const { temperature, apparentTemperature } = response.data.currently;
                console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
            }).catch(error => {
                console.log('Unable to fetch weather.');
            });
    }).catch(error => {
        if (error.code === 'ENOTFOUND') {
            console.log('Unable to connect to API server.');
        } else {
            console.log(error.message);
        }
    });