import {  createClient } from 'redis';
import { env } from '~/env.mjs';


const redisClient = createClient({
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

redisClient.on('end', () => {
    console.log('disc')
})
redisClient.on('connect', () => {
    console.log('connext')
})
start().then(() => {
    console.log('New instance was created (REDIS)')
}).catch(err =>{
    console.log(err)
})




