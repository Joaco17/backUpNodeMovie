const express = require ('express');
const api = express();
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes')


api.use('/users', userRoutes);
api.use('/movies', movieRoutes);
    

/* api.use('/pruebas', function(req, res){
    req.
}); */

module.exports = api;
  //comentario