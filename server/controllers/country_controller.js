const countries = require('../countries');

const getCountriesGeoJSON = (req, res) => {
    res.send(countries)
}

module.exports = {
    getCountriesGeoJSON
}