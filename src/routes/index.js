const customerRoutes = require('./customer-route');
const authRoutes = require('./auth-route');
const fareRoutes = require('./fare-route');
const productRoutes = require('./product-route');
const planRoutes = require('./plan-route');

module.exports = [
    ...customerRoutes,
    ...authRoutes,
    ...fareRoutes,
    ...productRoutes,
    ...planRoutes
];