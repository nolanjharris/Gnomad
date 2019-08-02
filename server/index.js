require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

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


// User Endpoints
app.get('/api/user/:id/posts', getPostsByUser);
app.get('/api/user/:id/country', getCountriesByUser);
app.post('/api/user/:id/country', addCountryToUser);
app.delete('/api/user:id/country', deleteCountryFromUser);

// Posts Endpoints
app.get('/api/posts/:country', getPostsByCountry);
app.post('/api/posts', addPost);
app.put('/api/posts/:id', editPost);
app.delete('/api/posts/:id', deletePost);


app.listen(SERVER_PORT, () => console.log('Listening on Port ' + SERVER_PORT));