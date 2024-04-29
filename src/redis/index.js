import  client, {redisStore as store} from './redis.js';

const redis = {
    client,
    store
};

export default redis;
