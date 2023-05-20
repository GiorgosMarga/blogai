import { createClient } from "redis";
import { env } from "~/env.mjs";

const redisClient = createClient({
  password: env.REDIS_PASSWORD,
  socket: {
    host: env.REDIS_URL,
    port: 11982,
  },
});

export default redisClient;

const start = async () => {
  await redisClient.connect();
};

start()
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });
