import  client, {redisStore as store} from './redis.js';
import * as query from './query/index.js';

const redis = {
    client,
    store,
    query
};

export default redis;
