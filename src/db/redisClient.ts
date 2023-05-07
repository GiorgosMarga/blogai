import { RedisClientType, createClient } from 'redis';
import { env } from '~/env.mjs';

const globalForRedis = global as unknown as {redis: RedisClientType}

const redisClient = globalForRedis.redis || createClient({
    password: env.REDIS_PASSWORD,
    socket: {
        host: env.REDIS_URL,
        port: 11982
    }
});


export default redisClient

const start = async () => {
    await redisClient.connect();
}


if(!globalForRedis.redis){
    start().then(() => {
        console.log('New instance was created (REDIS)')
    }).catch(err =>{
        console.log(err)
    })
}

if (env.NODE_ENV !== 'production') globalForRedis.redis = redisClient



