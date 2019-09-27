const moviesController = require ('../controllers/moviesController');
const express = require('express');
const appMovie= express();

appMovie.get('/list', moviesController.list);
appMovie.post('/crear', moviesController.crear);
appMovie.put('/update', moviesController.update);

appMovie.delete('/borrar', moviesController.borrar);

module.exports = appMovie;