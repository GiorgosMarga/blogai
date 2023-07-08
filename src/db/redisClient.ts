import { createClient } from "redis";
import { env } from "~/env.mjs";

const redisClient = createClient({
  password: env.REDIS_PASSWORD,
  socket: {
    host: env.REDIS_URL,
    port: parseInt(env.REDIS_PORT),
  },
});

const start = async () => {
  await redisClient.connect();
};

start().catch((err) => {
  console.log(err);
});

export default redisClient;
