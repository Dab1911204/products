const express = require('express');
const routes = express.Router();
const myAccountsController = require('../../controllers/admin/my-account.controller');
const multer = require('multer');
const upload = multer();
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');
const myAccountsValidates = require('../../validates/admin/my-accounts.validates');

routes.get('/', myAccountsController.index);
routes.get('/edit', myAccountsController.edit);
routes.patch('/edit', upload.single('avatar'),uploadCloud.upload, myAccountsController.editPatch);

module.exports = routes;