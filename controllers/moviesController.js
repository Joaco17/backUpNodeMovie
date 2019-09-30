const Movie = require('../models/moviesModel');
const fs = require('fs');

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


function myfileUpload (req,res){
       
    let id_movie = req.query.id_movie;

     
    if(!req.files){
        res.status(200).json({message:'no hay archivos'});
    }else{
        //res.status(200).json({message:'verificar datos', myfile: req.files.myfile.name, body: req.body });
        console.log("req ", req.files.myFile.name);
        let archivo = req.files.myFile;
        let nombre = req.files.myFile.name;
        let nombredivido = nombre.split('.');
        let extension = nombredivido[nombredivido.length-1];
        let extensionesValidas = ['png','jpg','jpeg','gif'];
        if(extensionesValidas.indexOf(extension) < 0){
         return res.status(400).json({message:'Extensión no validada, extesiones validads'+extensionesValidas.join(', ') });
        }else{
         
            let nombreArchivo = nombredivido[0]+""+Date.now()+"."+extension;
            let path = `./public/${nombreArchivo}`;
            
            Movie.findOneAndUpdate({_id: id_movie},{ $set:{ imagen: nombreArchivo} }, (errMovie, movieRes) =>{
                if ( errMovie) {
                    res.status(200).json({ message: 'no se ha encontrado la película' });
                }

                if ( movieRes ) {

                    if (!fs.existsSync('./public/images')){
                        fs.mkdirSync('./public/images');
                        
                        path =`./public/images/${nombreArchivo}`;
                        archivo.mv(path, err =>{
                            if(err){
                                res.status(400).json({ message:'no se ha subido archivo', err});
                            }else{
                                if( !fs.existsSync(movieRes.imagen) ){
                                    try {
                                        fs.unlink('./public/images/' + movieRes.imagen);
                                    } catch (error) {
                                       return res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes, imagen: 'imagen eliminada' });
                                    }
                                    res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes, imagen: 'imagen eliminada' });
                                }else{
                                    
                                    res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes});
                                }
                                
                            }
                            
                        });
                    }else{
                        path =`./public/images/${nombreArchivo}`;
                        archivo.mv(path, err =>{
                            if(err){
                                res.status(400).json({ message:'no se ha subido archivo', err});
                            }else{
                                if( !fs.existsSync(movieRes.imagen) ){
                                    console.log('./public/images/' + movieRes.imagen);
                                   try {
                                    fs.unlinkSync('./public/images/' + movieRes.imagen);
                                   } catch (error) {
                                    return res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes, imagen: 'imagen eliminada'});

                                   }
                                    res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes, imagen: 'imagen eliminada'});
                                }else{
                                    es.status(200).json({ message: 'se ha subido el archivo', movie: movieRes }); 
                                }
                            }
                            
                        });
                    }
                    
                }else{
                    res.json({message: 'error'});
                }
            });
           
          
           
        }

        
    }

    
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
    list,
    myfileUpload
}