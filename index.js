const mongoose = require('mongoose');
const express = require ('express');
const app = express();
const apiRoutes = require ('./api');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());





mongoose.connect('mongodb://localhost:27017/curso', {useNewUrlParser: true}).then(() => {  
    console.log('Conexion con exito');

    app.use('/', apiRoutes);

    app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    });

    }).catch(error => {
        console.log("error inesperado", error);
    });
    

console.log('Mi primer mensaje desde node');
