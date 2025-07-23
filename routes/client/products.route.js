const express = require('express');
const routes = express.Router();
const productsController = require('../../controllers/client/products.controller');

routes.get('/', productsController.index);
routes.get('/:slug', productsController.detail);

module.exports = routes;