import { Redis } from "ioredis";

const redis = new Redis({
    host: '192.168.0.102',
    port: '6379',
})


// redis.set('key', 'value')
// redis.get('key').then((res) => console.log(res))

// redis.setex('key', 5, 'xx')

redis.sadd('set', 1, 2, 2, 3, 23, 4, 32, 5, 2, 345, 2, 345)

redis.hset('obj', 'name', '18')
redis.hset('obj', 'fff', 'xx')