const Redis = require('../loaders/redis-loader');

const set = (key, value, seconds) => {
    Redis.set(key, value, 'EX', seconds);
};

const exists = key => Redis.exists(key);

const del = key => Redis.del(key);

module.exports = {
    set,
    exists,
    del,
};