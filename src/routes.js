const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController')

routes  
        //Users routes
        .get('/users', UserController.index)
        .post('/users', UserController.create)
        .put('/users/:id', UserController.update)
        .delete('/users/:id', UserController.delete)

        //Projects routes
        .get('/projects', ProjectController.index)
        .post('/projects', ProjectController.create)

// Export for using in server.js
module.exports = routes;

