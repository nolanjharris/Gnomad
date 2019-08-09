const countries = require('../countries');

const getCountriesGeoJSON = (req, res) => {
    res.json(countries)
}

module.exports = {
    getCountriesGeoJSON
}