const express = require('express');
const routes = express.Router();
const accountsController = require('../../controllers/admin/accounts.controller');
const multer = require('multer');
const upload = multer();
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');
const accountsValidates = require('../../validates/admin/accounts.validates');

routes.get('/', accountsController.index);
routes.get('/create',accountsController.create);
routes.post('/create',upload.single('avatar'), uploadCloud.upload,accountsValidates.createPost, accountsController.createPost);
routes.get('/edit/:id', accountsController.edit);
routes.patch('/edit/:id',upload.single('avatar'), uploadCloud.upload,accountsValidates.createPost, accountsController.editPatch);


module.exports = routes;