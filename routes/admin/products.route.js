const express = require('express');
const routes = express.Router();
const productsController = require('../../controllers/admin/products.controller');
const multer = require('multer');
//const storageMulter = require('../../helpers/storageMulter');
const upload = multer(); // cấu hình multer để lưu file tải lên vào thư mục uploads
const productsValidates = require('../../validates/admin/products.validates');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');


routes.get('/', productsController.index);
routes.patch('/change-status/:status/:id', productsController.changeStatus);
routes.patch('/change-multi', productsController.changeMulti);
routes.delete('/delete/:id', productsController.deleteItem);
routes.get('/create', productsController.create);
routes.post('/create', upload.single('thumbnail'), uploadCloud.upload, productsValidates.createPost, productsController.createPost);
routes.get('/edit/:id', productsController.edit);
routes.patch('/edit/:id', upload.single('thumbnail'),uploadCloud.upload, productsValidates.createPost, productsController.editPatch);
routes.get('/detail/:id', productsController.detail);
module.exports = routes;