const express = require('express');
const routes = express.Router();
const productsCategoryController = require('../../controllers/admin/products-category.controller');
const multer = require('multer');
const upload = multer(); // cấu hình multer để lưu file tải lên vào thư mục uploads
const productsValidates = require('../../validates/admin/products-category.validates');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');

routes.get('/', productsCategoryController.index);
routes.get('/create', productsCategoryController.create);
routes.post('/create', upload.single('thumbnail'), uploadCloud.upload, productsCategoryController.createPost);

module.exports = routes;