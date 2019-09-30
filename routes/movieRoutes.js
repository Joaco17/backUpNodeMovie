const moviesController = require ('../controllers/moviesController');
const express = require('express');
const appMovie= express();
const fileUpload = require('express-fileupload');

appMovie.get('/list', moviesController.list);
appMovie.post('/crear', moviesController.crear);
appMovie.put('/update', moviesController.update);

appMovie.delete('/borrar', moviesController.borrar);


//Necesito importar esta libreria y usarla antes del metodo.


appMovie.use(fileUpload());


appMovie.post('/fileUpload', moviesController.myfileUpload);



appMovie.post('/upload', function(req, res) {
    
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let myFile = req.files.myFile;

  // Use the mv() method to place the file somewhere on your server
  myFile.mv('public/images/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

module.exports = appMovie;