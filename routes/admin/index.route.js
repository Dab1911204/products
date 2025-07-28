const systemConfig = require('../../config/system');
const dashboardRoutes = require('./dashboard.route');
const productsRoutes = require('./products.route');
const productsCategoriesRoutes = require('./products-category.route');
const rolesRoutes = require('./roles.route');
const accountsRoutes = require('./accounts.route');
const authRoutes = require('./auth.route');


module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    
    app.use(PATH_ADMIN + '/dashboard', dashboardRoutes);
    app.use(PATH_ADMIN + '/products', productsRoutes);
    app.use(PATH_ADMIN + '/products-category', productsCategoriesRoutes);
    app.use(PATH_ADMIN + '/roles', rolesRoutes);
    app.use(PATH_ADMIN + '/accounts', accountsRoutes);
    app.use(PATH_ADMIN + '/auth', authRoutes);
}