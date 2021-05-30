import { promisify } from 'util';
import redis from 'redis';
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

client.on('error', (e) => console.error(e));

export const cacheGet = async (key: string): Promise<any> => {
  const data = await getAsync(key);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

export const cacheSetTTL = async (
  key: string,
  value: unknown,
  ttl = 300
): Promise<any> => {
  return await setexAsync(key, ttl, JSON.stringify(value));
};
