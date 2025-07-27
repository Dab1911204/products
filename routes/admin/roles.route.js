const express = require('express');
const routes = express.Router();
const rolesController = require('../../controllers/admin/roles.controller');

routes.get('/', rolesController.index);
routes.get('/create', rolesController.create);
routes.post('/create', rolesController.createPost);
routes.get('/edit/:id', rolesController.edit);
routes.patch('/edit/:id', rolesController.editPatch);
routes.get('/permissions', rolesController.permission);
routes.patch('/permissions', rolesController.permissionPatch);

module.exports = routes;