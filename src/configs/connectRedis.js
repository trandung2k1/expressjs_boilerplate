const { createClient } = require('redis');
const redisClient = createClient();
redisClient.on('error', (err) => {
    console.log(err);
    console.log('Redis Client Error');
    process.exit(1);
});
redisClient.on('connect', () => {
    console.log('Redis plugged in.');
});
(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;
