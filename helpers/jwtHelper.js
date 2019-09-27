const jwt = require('jsonwebtoken');
const clave = "mi clave secreta";


exports.encode = function( user ) {

    let payload = {
        nombre: user.nombre,
        email: user.email,
        password: user.password,
        role: user.role,
        iat: Date.now(),
        exp: (Date.now() + (1000*60*60) )
    }

    var token = jwt.sign(payload, clave);

    return token;
}

    exports.decode = function (token) {

        let respuesta = jwt.decode(token, clave);

        return respuesta;
     }
