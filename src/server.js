// Check the note to understand the order of stuffs in this project!
// Note: https://www.notion.so/Masterclass-Knex-45d9705a634a4c2b80ac1599585163a6

const express = require('express');
const knex = require('./database');
const routes = require('./routes');

const app = express();

// Setting express to req.body in Json
app.use(express.json());
app.use(routes);

// Error 'Not found' (wrong route)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;

    next(error);
});

// Catching all errors
app.use((error, req, res, next) => {
    // Returning the error status code and the message or 500 by default
    res.status(error.status || 500);
    res.json({
        error: error.message
    });
});

app.listen('3333', () => console.log('Server is running!'));