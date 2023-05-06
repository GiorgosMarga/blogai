import { createClient } from 'redis';

const redisClient = createClient({
    password: 'McXxBla6EknQ7k0s3dYZNMhdjk3DaoIS',
    socket: {
        host: 'redis-11982.c300.eu-central-1-1.ec2.cloud.redislabs.com',
        port: 11982
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

const start = async () => {
    await redisClient.connect();
}

start()



export default redisClient