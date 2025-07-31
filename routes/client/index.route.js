const productsRoutes = require('./products.route');
const homeRoutes = require('./home.route');
const categoryMiddleware = require('../../middlewares/client/category.middleware');

module.exports = (app) => {
  app.use(categoryMiddleware.index)
  app.use('/', homeRoutes);
  app.use('/products', productsRoutes);
}