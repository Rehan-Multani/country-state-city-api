const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors())
const countries = require('./countries.json');
const states = require('./states.json');
const cities = require('./cities.json');

// Endpoint to get all countries
app.get('/', (req, res) => {
    const countryNames = countries.map(country => country.name);
    res.json(countryNames); // Sending an array of country names as a JSON response
});


// Endpoint to get states of a specific country
app.get('/state', (req, res) => {
    const state = req.query.state;
    const countryStates = states.filter(state => state.country_name === state);
    const countryNames = countryStates.map(country => country.name);
    res.json(countryNames);
});

// Endpoint to get cities of a specific state
app.get('/city', (req, res) => {
    const city = req.query.city;
    console.log(req.query.city)
    const countryStates = cities.filter(state => state.state_name == city);

    // const stateCities = cities.filter(city => city.state_code === stateCode);
    res.json(countryStates);
});
app.get('/api', (req, res) => {
    const country = req.query.country;
    const city = req.query.state;

    if (country && city) {

        const countryStates = states.filter(state => state.country_name === country);

        const stateCities = cities.filter(state => state.state_name === city);

        if (stateCities) {

            res.json(stateCities);
        } else {

            res.json([]);
        }
    } else if (country) {

        const countryStates = states.filter(state => state.country_name === country);
        // const stateNames = countryStates.map(state => state.name);
        res.json(countryStates);
    } else {

        // const countryNames = countries.map(country => country.name);
        res.json(countries);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
