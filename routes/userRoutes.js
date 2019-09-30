const express = require('express');
const apUser = express.Router();
const userController = require('../controllers/userController');
const jwtProteger = require('../middleware/jwtMiddleware');


apUser.get('/list', userController.listar);
apUser.post('/login', userController.login);
/* 
apUser.use(jwtProteger.protegerRutas); */
 


apUser.get('/usuario', userController.getUser);
apUser.post('/create', userController.crear);
apUser.put('/update', userController.update);
apUser.delete('/borrar', userController.borrar);
apUser.put('/updatePassword', userController.updatePassword);

module.exports = apUser;