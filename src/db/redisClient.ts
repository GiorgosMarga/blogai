import { createClient } from "redis";
import { env } from "~/env.mjs";

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: 15388
    }
});

const start = async () => {
  await redisClient.connect();
};

start().catch((err) => {
  console.log(err);
});

export default redisClient;
