const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});

client.on('error', err => {
    console.log('Error ' + err);
});