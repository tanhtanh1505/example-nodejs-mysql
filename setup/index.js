const dotenv = require("dotenv");
const redis = require("redis");

module.exports.run = async () => {
  const envCfg = dotenv.config();
  if (envCfg.error) {
    throw new Error(envCfg.error.message);
  }
  const parsedCfg = envCfg.parsed;

  await (async function connectRedis() {
    const url = `redis://${parsedCfg["REDIS_HOST"]}:${parsedCfg["REDIS_PORT"]}`;
    global.redisClient = redis.createClient({ url });
    global.redisClient.on("error", (err) => {
      console.log("err redis: ", err);
    });
    console.log("reddis connected");
    await global.redisClient.connect();
  })();
};
