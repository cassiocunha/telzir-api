const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
        cors: true
    }
});

module.exports = server;
