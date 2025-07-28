const express = require('express');
const routes = express.Router();
const authController = require('../../controllers/admin/auth.controller');
const authValidates = require('../../validates/admin/auth.validates');

routes.get('/login', authController.login);
routes.post('/login', authValidates.loginPost,authController.loginPost);
routes.get('/logout', authController.logout);

module.exports = routes;