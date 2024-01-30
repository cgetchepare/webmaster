const express = require('express');

const RoleController = require('./controllers/RoleController');
const UsuarioController = require('./controllers/UsuarioController');
const LoginController = require('./controllers/LoginController');

const AuthMiddleware = require('./middlewares/auth');
const routes = express.Router();

routes.get('/roles', RoleController.index);
routes.post('/roles', RoleController.store);

routes.get('/usuarios', UsuarioController.list);
routes.get('/usuario/:id', UsuarioController.view);
// routes.post('/usuarios/:role_id', UsuarioController.store);
routes.post('/usuario', UsuarioController.store);
routes.put('/usuario', UsuarioController.edit);
routes.delete('/usuario/:id', UsuarioController.delete);

routes.post('/login', LoginController.auth);

module.exports = routes;

