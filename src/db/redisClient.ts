import { createClient } from 'redis';
import { env } from '~/env.mjs';

const redisClient = createClient({
    password: env.REDIS_PASSWORD,
    socket: {
        host: env.REDIS_URL,
        port: env.REDIS_PORT
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

const start = async () => {
    await redisClient.connect();
}

start().catch(err =>{
    console.log(err)
})



export default redisClient