const jwt = require('jsonwebtoken');
const { ERR_INVALID_TOKEN } = require('../utils/error-type');
const { ALGORITHM } = require('./config');

const generate = data => (
    new Promise(resolve => {
        jwt.sign(data, process.env.SECRET_KEY, { algorithm: ALGORITHM }, (err, token) => {
            if (err) {
                console.error(err);
                throw new Error(ERR_INVALID_TOKEN);
            }
            resolve(token);
        });
    })
);

module.exports = {
    generate
};