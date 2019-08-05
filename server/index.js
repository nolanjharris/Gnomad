require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const auth_controller = require('./controllers/auth_controller');
const post_controller = require('./controllers/post_controller');
const user_controller = require('./controllers/user_controller');
const middlewares = require('./middlewares/auth_middlewares');
const country_controller = require('./controllers/country_controller');

const { getCountriesGeoJSON } = country_controller;
const { checkForUser } = middlewares;
const { getPostsByUser, getCountriesByUser, addCountryToUser, deleteCountryFromUser } = user_controller;
const { getPostsByCountry, addPost, editPost, deletePost } = post_controller;
const { register, login, logout } = auth_controller;

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db);
        console.log('Database Connected B-)');
    })

// Auth Endpoints
app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/logout', logout)

// User Endpoints
app.get('/api/user/:id/posts', getPostsByUser);
app.get('/api/user/:id/country', checkForUser, getCountriesByUser);
app.post('/api/user/country/:country', checkForUser, addCountryToUser);
app.delete('/api/user/country/:country', checkForUser, deleteCountryFromUser);

// Posts Endpoints
app.get('/api/posts/:country', getPostsByCountry);
app.post('/api/posts', checkForUser, addPost);
app.put('/api/posts/:country', checkForUser, editPost);
app.delete('/api/posts/:country', checkForUser, deletePost);

// Countries GeoJSON Endpoint
app.get('/api/countries', getCountriesGeoJSON);

app.listen(SERVER_PORT, () => console.log('Listening on Port ' + SERVER_PORT));