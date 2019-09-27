const Movie = require('../models/moviesModel');

    

function list( req, res ){

        Movie.find( {} ).populate('user').exec( function( error, movies){
            if(error) {
                return res.status(400).json({'error': error});
            }
            if(movies) {
                return res.status(200).json({'movies': movies});
            } else {
                return res.status(400).json({'error': 'no se pueden mostrar peliculas'});
            } 
        });
    }

    function crear(req, res) {
        if ( !req.body.movie) {
            return res.status(400).json({'error': 'faltan parametros'});
        } else {
            let body = req.body.movie;

            let newMovie = new Movie( body );

            newMovie.save().then(movieCreated => {
                return res.status(200).json({'message': 'Pelicula creada correctamente', movieCreated});
            }).catch(err => {
                return res.status(400).json({'error': 'No se puede crear pelicula',err});
            });
        }

    /* function crearPelicula (req, res){
        if (!req.body.movie){
            return res.status(400).json({'error': 'Faltan parametros'});
        } else {
            let movie = req.body.movie;
            let newMovie = new Movie(movie);
    
            newMovie.save().then(movieCreated => {
                return res.status(200).json({'message': 'Pelicula creada correctamente', movieCreated});
            }).catch(err => {
                return res.status(400).json({'error': 'No se puede crear pelicula',err});
            });
        }
    }
 */


    }


    function update (req, res) {
        if(!req.query.id) {

        } else {
            let id = req.query.id;
            let body = req. body.movie;

            Movie.updateOne({_id : id}, {$set: body}, function(error, movieUpdate){
                    if( error ) {
                        return res.status(400).json({'error': 'No se ha podido actualizar', 'movie': newMovie});
                    }
                    if( movieUpdate ) {
                        return res.status(400).json({'message': 'Pelicula', 'movie': movieUpdate});
                    }
            });
        }
    }

    function borrar (req, res) {
        if(!req.query.id) {

        } else {
            let id = req.query.id;
            let body = req. body.movie;

            Movie.deleteOne({ _id: id }, {$set: body}, function(error, movieUpdate){
                    if( error ) {
                        return res.status(400).json({'error': 'No se ha podido actualizar', 'movie': newMovie});
                    }
                    if( movieUpdate ) {
                        return res.status(400).json({'message': 'Pelicula', 'movie': movieUpdate});
                    }
            });
        }
    }



module.exports = {
    borrar,
    update,
    crear,
    list
}