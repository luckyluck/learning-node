// TODO: implement FE for this functionality to be able to display forecast data for the user
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address)
    .then(location => {
        console.log(location.address);
        weather.getWeather(location.latitude, location.longitude)
            .then(weather => {
                console.log(`It's currently ${weather.temperature}. It feels like ${weather.apparentTemperature}.`);
            })
            .catch(error => {
                console.log(error);
            });
    }).catch(error => {
        console.log(error);
    });