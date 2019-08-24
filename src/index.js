require('dotenv-safe').config();
require('./loaders/mongo-loader');
const server = require('./server');
const routes = require('./routes');
const jwtStrategy = require('./auth/jwt');
const hapiAuthJwt2 = require('hapi-auth-jwt2');

const init = async () => {
    await server.register(hapiAuthJwt2);
    server.auth.strategy(jwtStrategy.name, jwtStrategy.schema, jwtStrategy.options);
    server.auth.default('jwt');
    
    server.route(routes);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
