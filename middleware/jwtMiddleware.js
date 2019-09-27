const jwtHelper = require ('../helpers/jwtHelper');

function protegerRutas( req, res, next ) {
    const acceso = false;

    if(!req.headers.authorization) {
        res.status(400).json;
    } else {
        let token = req.headers.authorization;

        console.log('token decode', jwtHelper.decode(token));
        
        next();
    }

}

module.exports = {
    protegerRutas
}