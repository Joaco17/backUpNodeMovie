const user = require('../models/userModel');
const jwtAuth = require ('../helpers/jwtHelper');

/**BCRYPT */
const bcrypt = require('bcrypt');
const saltRounds = 10;


/**BCRYPT FINAL */

function login(req, res) {
    let usuario = req.body.user;
    //return res.status(400).json({'usuario.email ': usuario.email });
    user.findOne({email: usuario.email }, function(error, resp){
        if(error) {
            return res.status(400).json({'error email': error});
        }
       // return res.status(400).json({ resp: resp[0].password });
        if( resp ) {

            
            bcrypt.compare(usuario.password, resp.password, function(err, respuesta) {

            if(err) {
                return res.status(400).json({'error encriptando': err});
            } 
            if(respuesta)  {
                let token = jwtAuth.encode(resp);
                return res.status(200).json({'message': 'usuario logeado', 'usuario': resp, token});
            } else {

                /**COntrolar cuando las contraseñas no coincidan */
                return res.status(400).json({'error': 'La contraseña no coincide'});
            }
            });
        } else {
            return res.status(400).json({'error': 'No se ha encontrado el mail'}); 
        }
    })
}

function listar(req, res) {
    user.find({}, function(error, respUser) {
        if( error ) {
            return res.status(400).json({'error': error, 'message' :'NO se puede listar el usuario'});
        }
        if (respUser) {
            return res.status(200).json({'message' :'lista de usuarios', usuarios: respUser});
        }
    })
}

function update(req, res) {
    let id = req.query.id;
    const usuario = req.body.user;

    const protectedUser = {
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role
    };
 
   /*  user.findByIdAndUpdate( id, {$set:{nombre:usuario.nombre, email:usuario.email, role: usuario.role} }, {new:true}, function(error, updateResp){
        if( error ) {
            return res.status(400).json({'error': error, 'message' :'No se pudo modificar el parámetro'});
        }
        if ( updateResp ) {
            res.status(200).json({'message' :'usuario updateado', updateResp });
        }
    }); 
 */


    user.updateOne({ _id: id}, {$set: protectedUser}, function(error, updateResp){
        if( error ) {
            return res.status(400).json({'error': error, 'message' :'No se pudo modificar el parámetro'});
        }
        if ( updateResp ) {
            res.status(200).json({'message' :'usuario updateado', updateResp });
        }
    });
}

function updatePassword(req, res) {
    let id = req.query.id;
    const password = req.body.password;


    bcrypt.hash(password, saltRounds, function(err, hash) {
        if ( err ) {
            return res.status(400).json({'error': 'no se ha podido enciptar'});
        }
        if ( hash ) {
            user.updateOne({ _id: id}, {$set: {password: hash} }, function(error, updateResp){
                if( error ) {
                    return res.status(400).json({'error': error, 'message' :'No se pudo modificar el parámetro'});
                }
                if ( updateResp ) {
                    res.status(200).json({'message' :'usuario updateado', updateResp });
                }
            });
        }
    });
}

function borrar(req, res) {
    const usuario = req.body.user;
    let id = req.query.id;

    user.find({_id: id}, function(error, findResp){

        if ( error ) {
            return res.status(400).json({'error': error, 'message' :'No se pudo listar usuario'});
        }

        if ( findResp ) {
            if ( findResp.length < 1 ) {
                return res.status(400).json({ 'message' :'ID no existe' });
            }
        }

        user.deleteOne({ _id: id}, function(error, deleteResp){
            if( error ) {
                return res.status(400).json({'error': error, 'message' :'No se pudo eliminar el usuario'});
            }
            if ( deleteResp ) {
                res.status(200).json({'message' :'usuario borrado', deleteResp });
            }
        });
    });
}

function crear(req, res) {
    //return res.status(200).json({'datos': req.body.user}); 
    const usuario = req.body.user;
    console.log('usuario ', usuario);
    


    bcrypt.hash(usuario.password, saltRounds, function(err, hash) {
        if ( err ) {
            return res.status(400).json({'error': 'no se ha podido enciptar'});
        }
        if ( hash ) {
            newUser.password = hash;
            newUser.save().then(() => {

            console.log('usuario creado');
            res.status(200).json( {newUser} );

            }).catch(error => {
                console.log("error user", error);
                res.status(400).json({'error': error});
                
            });
        }
    });

    let newUser = new user( usuario );
   /*  nombre: 'pedro2',
    email: 'jose2@gmail.com',
    password:'12345'
    }); */


    
}

module.exports = {
    login,
    listar,
    update,
    borrar,
    crear,
    updatePassword
}